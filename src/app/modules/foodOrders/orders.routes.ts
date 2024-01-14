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
router.get("/get-all-food-items", routeInfoMessage(), FoodItemController.getAllFoodItem);
//! GET ALL food items
router.get("/get-single-food-item/:foodItemId", routeInfoMessage(), FoodItemController.getSingleFoodItemsDetails);

export const FoodOrderRoutes = router;
