/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-var-requires */
import process from 'child_process';

import config from '../config';
import { errorLogger, logger } from '../shared/logger';

const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

const backupDatabase = () => {
  const todayDate = new Date().toISOString().slice(0, 10);
  const timestamp = Date.now();
  const backupDbName: string = `${config.db_name}-${todayDate}-${timestamp}.dump`;
  const toBackupDbPath: string = path.join(config.db_backup_path, backupDbName);

  const COMMAND: string = `docker exec ${config.db_container_name} pg_dump -U ${config.db_user} -Fc ${config.db_name} > ${toBackupDbPath}`;
  try {
    // dump the database
    process.exec(COMMAND);
    logger.info(`Database backup successFull for the file ${backupDbName}`);

    // Delete old dumped database
    const oldFileNames = fs.readdirSync(config.db_backup_path);
    oldFileNames.forEach((fileName: string) => {
      if (fileName !== backupDbName) {
        // Delete file
        const filePath: string = path.join(config.db_backup_path, fileName);
        fs.unlinkSync(filePath);
      }
    });
  } catch (err) {
    errorLogger.error('Database Backup Error:' + err);
  }
};

const dbBackupTask = cron.schedule('*/10 * * * * *', backupDatabase);

export default dbBackupTask;
