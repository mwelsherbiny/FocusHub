import { Router } from "express";
import User from "../models/User.js";
import Task from "../models/Task.js";
import History from "../models/History.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config.js";
import tokenDecoder from "../middleware/tokenDecoder.js";

const apiRouter = new Router();

apiRouter.use("/api/tasks", tokenDecoder);
apiRouter.use("/api/users/me", tokenDecoder);

apiRouter.post("/api/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username required" });
  }
  if (!password) {
    return res.status(400).json({ error: "Password required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const passwordCorrect = await bcrypt.compare(password, user.password_hash);
    if (passwordCorrect) {
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      const token = jwt.sign(userForToken, config.SECRET);
      return res.status(200).send({ token });
    } else {
      return res.status(401).json({ error: "invalid password" });
    }
  } catch (error) {
    next(error);
  }
});

apiRouter.post("/api/signup", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username required" });
  }
  if (!password) {
    return res.status(400).json({ error: "Password required" });
  }

  try {
    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exists " });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      password_hash: hashedPassword,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign(
      {
        username: savedUser.username,
        id: savedUser._id,
      },
      config.SECRET,
    );

    return res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
});

apiRouter.get("/api/tasks", async (req, res, next) => {
  const token = req.token;

  try {
    const tasks = await Task.find({ user_id: token.id });
    return res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
});

apiRouter.post("/api/tasks", async (req, res, next) => {
  const token = req.token;
  const task = req.body;

  try {
    const newTask = new Task({
      name: task.name,
      completed: task.completed,
      user_id: token.id,
    });
    const savedTask = await newTask.save();
    return res.status(201).json(savedTask);
  } catch (error) {
    next(error);
  }
});

apiRouter.delete("/api/tasks/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    await Task.findByIdAndDelete(id);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
});

apiRouter.put("/api/tasks/:id", async (req, res, next) => {
  const task = req.body;
  const id = req.params.id;
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, task, { new: true });
    return res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
});

apiRouter.get("/api/users/me", async (req, res) => {
  const token = req.token;
  const user = await User.findById(token.id);
  return res.status(200).json(user);
});

apiRouter.put("/api/users/me", async (req, res, next) => {
  const token = req.token;
  const data = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(token.id, data, {
      new: true,
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

apiRouter.get("/api/users/me/history", async (req, res, next) => {
  const token = req.token;
  const { start_date, end_date } = req.query;

  const query = { user_id: token.id };

  if (start_date && end_date) {
    query.date = { $gte: new Date(start_date), $lte: new Date(end_date) };
  }

  try {
    const history = await History.find(query);
    res.status(200).json(history);
  } catch (error) {
    next(error);
  }
});

apiRouter.get("/api/users/me/history/:date", async (req, res, next) => {
  const token = req.token;
  const date = req.params.date;

  try {
    const history = await History.findOne({ user_id: token.id, date });
    res.status(200).json(history);
  } catch (error) {
    next(error);
  }
});

// updates or creates a history entry for a specific user at a specific day
apiRouter.post("/api/users/me/history", async (req, res, next) => {
  const token = req.token;
  const entry = req.body;

  try {
    const historyEntry = await History.findOneAndUpdate(
      { user_id: token.id, date: entry.date },
      { $set: { mood: entry.mood } },
      { upsert: true, new: true },
    );
    res.status(201).json(historyEntry);
  } catch (error) {
    next(error);
  }
});

export default apiRouter;
