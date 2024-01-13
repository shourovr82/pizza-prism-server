import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { foodMenuFilterableFields } from "./foodMenu.constants";
import { FoodMenuService } from "./foodMenu.service";

//! create food menu
const createFoodMenu = catchAsync(async (req: Request, res: Response) => {
  const result = await FoodMenuService.createFoodMenu(req);
  //
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Food Menu Created successfully!",
    data: result,
  });
});
// ! GET ALL CUSTOMERS
const getAllFoodMenu = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, foodMenuFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await FoodMenuService.getAllFoodMenu(filters, options);
  //
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Food Menu retrieved successfully!",
    meta: result.meta,
    data: result.data,
  });
});

// update food menu details
const updateFoodMenuDetails = catchAsync(async (req: Request, res: Response) => {
  const foodMenuId = req.params?.foodMenuId;
  const result = await FoodMenuService.updateFoodMenuDetails(foodMenuId, req);
  //
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Food Menu Details Update successfully!",
    data: result,
  });
});

export const FoodMenuController = { getAllFoodMenu, updateFoodMenuDetails, createFoodMenu };
