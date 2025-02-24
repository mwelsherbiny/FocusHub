import mongoose from "mongoose";
import logger from "./logger.js";
import config from "../config.js";

const connectToDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Error connecting to MongoDB", error.message);
  }
};

export default connectToDB;
