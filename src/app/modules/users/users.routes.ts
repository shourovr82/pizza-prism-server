import express from "express";
import auth from "../../middlewares/auth";
import { UserRoles } from "@prisma/client";
import { UserCustomersController } from "./customers/user.customers.controller";

const router = express.Router();

//! GET ALL CUSTOMERS
router.get("/customers/get-all-customers", auth(UserRoles.SUPERADMIN), UserCustomersController.getAllCustomers);

export const UserRoutes = router;
