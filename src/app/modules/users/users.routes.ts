import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { UserRoles } from "@prisma/client";
import { UsersController } from "./users.controller";
import { UserValidation } from "./user.validation";
import routeInfoMessage from "../../middlewares/routeInfoMessage";

const router = express.Router();

//! GET ALL USERS
router.get("/get-all-users", routeInfoMessage(), auth(UserRoles.SUPERADMIN), UsersController.getAllUsers);

//! UPDATE CUSTOMER DETAILS
router.patch("/profile/update", routeInfoMessage(), auth(UserRoles.SUPERADMIN), (req: Request, res: Response, next: NextFunction) => {
  req.body = UserValidation.updateProfile.parse(JSON.parse(req.body.data));
  return UsersController.getAllUsers(req, res, next);
});

export const UserRoutes = router;
