import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { UserRoles } from "@prisma/client";
import { UsersController } from "./users.controller";
import { UserValidation } from "./user.validation";
import routeInfoMessage from "../../middlewares/routeInfoMessage";
import { FileUploadHelper } from "../../../helpers/FileUploadHelper";

const router = express.Router();

//! GET ALL USERS
router.get("/get-all-users", routeInfoMessage(), auth(UserRoles.SUPERADMIN), UsersController.getAllUsers);

//! UPDATE USER DETAILS

// update profile details
router.patch("/update-profile/:profileId", auth(UserRoles.SUPERADMIN), FileUploadHelper.uploadProfileImage.single("file"), (req: Request, res: Response, next: NextFunction) => {
  req.body = UserValidation.updateProfile.parse(JSON.parse(req.body.data));
  return UsersController.updateProfileDetails(req, res, next);
});
export const UserRoutes = router;
