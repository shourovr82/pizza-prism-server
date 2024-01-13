import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { RestaurantService } from "./restaurantInformation.service";

// update user details
const updateRestaurantDetails = catchAsync(async (req: Request, res: Response) => {
  const result = await RestaurantService.updateRestaurantDetails(req);
  //
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Restaurant Update successfully!",
    data: result,
  });
});
// getRestaurantDetails
const getRestaurantDetails = catchAsync(async (req: Request, res: Response) => {
  const result = await RestaurantService.getRestaurantDetails();
  //
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Restaurant retrieved successfully!",
    data: result,
  });
});

export const RestaurantController = {
  updateRestaurantDetails,
  getRestaurantDetails,
};
