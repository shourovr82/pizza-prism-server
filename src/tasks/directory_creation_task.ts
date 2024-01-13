import fs from "fs";
import { logger } from "../shared/logger";

const create_required_directories = () => {
  /**
   *   create required directories if they are not already exist during the application startup.
   **/

  // create data directory
  if (!fs.existsSync("./data")) {
    fs.mkdirSync("./data");
  }

  // create uploads directory
  if (!fs.existsSync("./data/uploads")) {
    fs.mkdirSync("./data/uploads");
  }

  // Create user directory
  if (!fs.existsSync("./data/uploads/users")) {
    fs.mkdirSync("./data/uploads/users");
  }

  // Create food menu directory
  if (!fs.existsSync("./data/uploads/food-menu")) {
    fs.mkdirSync("./data/uploads/food-menu");
  }
  // Create food item directory
  if (!fs.existsSync("./data/uploads/food-items")) {
    fs.mkdirSync("./data/uploads/food-items");
  }

  // Create backup directory where database backup file will be stored.
  if (!fs.existsSync("./data/backup")) {
    fs.mkdirSync("./data/backup");
  }

  logger.info("Directories Successfully Created!!!");
};

export default create_required_directories;
