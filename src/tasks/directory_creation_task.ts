import fs from 'fs';
import { logger } from '../shared/logger';

const create_required_directories = () => {
  /**
   *   create required directories if they are not already exist during the application startup.
   **/

  // create data directory
  if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data');
  }

  // create uploads directory
  if (!fs.existsSync('./data/uploads')) {
    fs.mkdirSync('./data/uploads');
  }

  // Create user directory
  if (!fs.existsSync('./data/uploads/users')) {
    fs.mkdirSync('./data/uploads/users');
  }

  // Create property directory
  if (!fs.existsSync('./data/uploads/property')) {
    fs.mkdirSync('./data/uploads/property');
  }

  // Create backup directory where database backup file will be stored.
  if (!fs.existsSync('./data/backup')) {
    fs.mkdirSync('./data/backup');
  }

  logger.info('Directories Successfully Created!!!');
};

export default create_required_directories;
