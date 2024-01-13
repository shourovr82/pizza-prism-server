import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { foodItemFilterableFields } from "./foodItems.constants";
import { FoodItemService } from "./foodItems.service";

//! create food Item
const createFoodItem = catchAsync(async (req: Request, res: Response) => {
  const result = await FoodItemService.createFoodItems(req);
  //
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Food Item Created successfully!",
    data: result,
  });
});
// ! GET ALL CUSTOMERS
const getAllFoodItem = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, foodItemFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await FoodItemService.getAllFoodItems(filters, options);
  //
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Food Item retrieved successfully!",
    meta: result.meta,
    data: result.data,
  });
});

// update food Item details
const updateFoodItemDetails = catchAsync(async (req: Request, res: Response) => {
  const foodItemId = req.params?.foodItemId;
  const result = await FoodItemService.updateFoodItemsDetails(foodItemId, req);
  //
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Food Item Details Update successfully!",
    data: result,
  });
});

export const FoodItemController = { getAllFoodItem, updateFoodItemDetails, createFoodItem };
