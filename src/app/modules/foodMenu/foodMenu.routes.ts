import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { UserRoles } from "@prisma/client";
import routeInfoMessage from "../../middlewares/routeInfoMessage";
import { FoodMenuController } from "./foodMenu.controller";
import { FoodMenuValidation } from "./foodMenu.validation";
import { FileUploadHelper } from "../../../helpers/fileUpload/FileUploadHelper";

const router = express.Router();
// ! create food menu
router.post("/create-food-menu", auth(UserRoles.SUPERADMIN), FileUploadHelper.uploadFoodMenuImage.single("file"), (req: Request, res: Response, next: NextFunction) => {
  req.body = FoodMenuValidation.createFoodMenuDetails.parse(JSON.parse(req.body.data));
  return FoodMenuController.createFoodMenu(req, res, next);
});
//! GET ALL food menu
router.get("/get-all-food-menu", routeInfoMessage(), FoodMenuController.getAllFoodMenu);

//! UPDATE FOOD MENU DETAILS

// update food menu details
router.patch("/update-food-menu/:foodMenuId", auth(UserRoles.SUPERADMIN), FileUploadHelper.uploadProfileImage.single("file"), (req: Request, res: Response, next: NextFunction) => {
  req.body = FoodMenuValidation.updateFoodMenu.parse(JSON.parse(req.body.data));
  return FoodMenuController.updateFoodMenuDetails(req, res, next);
});
export const FoodMenuRoutes = router;
