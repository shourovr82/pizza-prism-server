import express from "express";
import auth from "../../middlewares/auth";
import { UserRoles } from "@prisma/client";
import routeInfoMessage from "../../middlewares/routeInfoMessage";
import { FoodItemController } from "./orders.controller";
import { FoodOrderValidation } from "./orders.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();
// ! create food item
router.post("/create-new-order", auth(UserRoles.CUSTOMER), validateRequest(FoodOrderValidation.createNewFoodOrder), FoodItemController.createNewFoodOrder);
//! GET ALL food items
router.get("/get-all-orders", routeInfoMessage(), auth(UserRoles.SUPERADMIN, UserRoles.CASHIER), FoodItemController.getAllOrders);
//! GET ALL food items
router.get("/get-single-order/:orderId", routeInfoMessage(), FoodItemController.getSingleOrderDetails);
// ! get my ordered food
router.get("/get-my-ordered-food", routeInfoMessage(), auth(UserRoles.CUSTOMER), FoodItemController.getMyOrderedFood);

export const FoodOrderRoutes = router;
