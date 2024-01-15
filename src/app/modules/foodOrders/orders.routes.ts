import express from "express";
import auth from "../../middlewares/auth";
import { UserRoles } from "@prisma/client";
import routeInfoMessage from "../../middlewares/routeInfoMessage";
import { OrdersController } from "./orders.controller";
import { FoodOrderValidation } from "./orders.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();
// ! create Order
router.post("/create-new-order", auth(UserRoles.CUSTOMER), validateRequest(FoodOrderValidation.createNewOrder), OrdersController.createNewFoodOrder);
//! GET ALL   Order
router.get("/get-all-orders", routeInfoMessage(), auth(UserRoles.SUPERADMIN, UserRoles.CASHIER), OrdersController.getAllOrders);
//! GET ALL   Order
router.get("/get-single-order/:orderId", routeInfoMessage(), OrdersController.getSingleOrderDetails);
// ! get my ordered food
router.get("/get-my-ordered-food", routeInfoMessage(), auth(UserRoles.CUSTOMER), OrdersController.getMyOrderedFood);

export const FoodOrderRoutes = router;
