import logger from "../utils/logger.js";

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  } else if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "invalid token" });
  } else if (err.name === "TokenExpiredError") {
    return res.status(401).json({ error: "token expired" });
  }

  next(err);
};

export default errorHandler;
