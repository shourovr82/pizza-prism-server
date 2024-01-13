import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { UserRoles } from "@prisma/client";
import { RestaurantController } from "./restaurantInformation.controller";
import { RestaurantValidation } from "./restaurantInformation.validation";
import { FileUploadHelper } from "../../../helpers/FileUploadHelper";

const router = express.Router();
// update
router.put("/update-restaurant", auth(UserRoles.SUPERADMIN), FileUploadHelper.uploadProfileImage.single("file"), (req: Request, res: Response, next: NextFunction) => {
  req.body = RestaurantValidation.updateRestaurant.parse(JSON.parse(req.body.data));
  return RestaurantController.updateRestaurantDetails(req, res, next);
});
// getRestaurantDetails
router.get("/get-details", RestaurantController.getRestaurantDetails);
export const RestaurantRoutes = router;
