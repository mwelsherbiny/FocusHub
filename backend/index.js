import config from "./config.js";
import logger from "./utils/logger.js";
import app from "./app.js";

app.listen(config.PORT, () => {
  logger.info(`Server is running on port ${config.PORT}`);
});
