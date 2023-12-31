import fs from "fs";
import { infoLogger } from "../shared/logger";

export const deleteOldImage = (oldProfileImagePath?: string, profileImagePath?: string) => {
  const oldFilePaths = "uploads/" + oldProfileImagePath;

  if (oldProfileImagePath !== undefined && profileImagePath !== undefined) {
    fs.unlink(oldFilePaths, (err) => {
      if (err) {
        infoLogger.info("Error deleting old file");
      }
    });
  }
};
