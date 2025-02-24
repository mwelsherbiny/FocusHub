import "dotenv/config";

const config = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI:
    process.env.NODE_ENV === "production"
      ? process.env.MONGODB_URI
      : process.env.TEST_MONGODB_URI,
  SECRET: process.env.SECRET,
};

export default config;
