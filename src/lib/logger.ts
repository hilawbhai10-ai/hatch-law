import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

import devLogger from "../config/logger.config.js";
// import prodLogger from "../config/logger.prod.config.js";

// ESM-safe __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// load env
dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

// pick logger
const logger = process.env.NODE_ENV === "production"
  ? devLogger
  : devLogger;

export default logger;