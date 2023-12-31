import express from "express";
import auth from "../../middlewares/auth";
import { UserRoles } from "@prisma/client";
import { UserCustomersController } from "./customers/user.customers.controller";
import { UsersController } from "./users.controller";

const router = express.Router();

//! GET ALL CUSTOMERS
router.get("/customers/get-all-customers", auth(UserRoles.SUPERADMIN), UserCustomersController.getAllCustomers);

//! GET ALL USERS
router.get("/get-all-users", auth(UserRoles.SUPERADMIN), UsersController.getAllUsers);

export const UserRoutes = router;
