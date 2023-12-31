import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { UserRoles } from "@prisma/client";
import { UserCustomersController } from "./customers/user.customers.controller";
import { UsersController } from "./users.controller";
import { UserValidation } from "./user.validation";
import routeInfoMessage from "../../middlewares/routeInfoMessage";

const router = express.Router();

//! GET ALL CUSTOMERS
router.get("/customers/get-all-customers", auth(UserRoles.SUPERADMIN), UserCustomersController.getAllCustomers);
//! UPDATE CUSTOMER DETAILS
router.patch(
  "/customers/update",
  routeInfoMessage(),
  auth(UserRoles.SUPERADMIN),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.updateProfile.parse(JSON.parse(req.body.data));
    return UsersController.getAllUsers(req, res, next);
  },
  // UsersController,
);

//! GET ALL USERS
router.get("/get-all-users", auth(UserRoles.SUPERADMIN), UsersController.getAllUsers);

export const UserRoutes = router;
