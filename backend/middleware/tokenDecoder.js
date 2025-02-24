import jwt from "jsonwebtoken";
import config from "../config.js";

export default function tokenDecoder(req, res, next) {
  const authHeader = req.headers.authorization;

  let token = null;

  if (authHeader) {
    token = authHeader.split(" ")[1]; // "Bearer <token>"
  }
  if (!token) {
    return res.status(401).json({ error: "Token required" });
  }

  try {
    const decodedToken = jwt.verify(token, config.SECRET);
    req.token = decodedToken;
    next();
  } catch (error) {
    next(error);
  }
}
