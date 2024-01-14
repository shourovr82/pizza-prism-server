import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { UserRoles } from "@prisma/client";
import routeInfoMessage from "../../middlewares/routeInfoMessage";
import { FoodItemController } from "./foodItems.controller";
import { FoodItemValidation } from "./foodItems.validation";
import { FileUploadHelper } from "../../../helpers/fileUpload/FileUploadHelper";

const router = express.Router();
// ! create food item
router.post("/create-food-item", auth(UserRoles.SUPERADMIN), FileUploadHelper.uploadFoodItemImage.single("file"), (req: Request, res: Response, next: NextFunction) => {
  req.body = FoodItemValidation.createFoodItem.parse(JSON.parse(req.body.data));
  return FoodItemController.createFoodItem(req, res, next);
});
//! GET ALL food items
router.get("/get-all-food-items", routeInfoMessage(), FoodItemController.getAllFoodItem);
//! GET ALL food items
router.get("/get-single-food-item/:foodItemId", routeInfoMessage(), FoodItemController.getSingleFoodItemsDetails);

//! UPDATE FOOD item DETAILS

// update food item details
router.patch("/update-food-item/:foodItemId", auth(UserRoles.SUPERADMIN), FileUploadHelper.uploadProfileImage.single("file"), (req: Request, res: Response, next: NextFunction) => {
  req.body = FoodItemValidation.updateFoodItem.parse(JSON.parse(req.body.data));
  return FoodItemController.updateFoodItemDetails(req, res, next);
});
export const FoodItemsRoutes = router;
