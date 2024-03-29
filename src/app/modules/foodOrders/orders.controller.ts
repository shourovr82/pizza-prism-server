import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { ordersFilterableFields } from "./orders.constants";
import { FoodOrderService } from "./orders.service";
import { IRequestUser } from "../../interfaces/global.interfaces";

//! create food Order
const createNewFoodOrder = catchAsync(async (req: Request, res: Response) => {
  const { profileId } = req.user as IRequestUser;
  const result = await FoodOrderService.createNewFoodOrder(profileId, req.body);
  //
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Food Order Created successfully!",
    data: result,
  });
});

// ! GET ALL ORDERS
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ordersFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await FoodOrderService.getAllOrders(filters, options);
  //
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Orders retrieved successfully!",
    meta: result.meta,
    data: result.data,
  });
});
// get single Order details
const getMyOrderedFood = catchAsync(async (req: Request, res: Response) => {
  const { profileId } = req.user as IRequestUser;
  const result = await FoodOrderService.getMyFoodOrdered(profileId);
  //
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My all Order  retrieved successfully!",
    data: result,
  });
});
// get single Order details
const getSingleOrderDetails = catchAsync(async (req: Request, res: Response) => {
  const orderId = req.params?.orderId;
  const result = await FoodOrderService.getSingleOrderDetails(orderId);
  //
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order Details retrieved successfully!",
    data: result,
  });
});

export const OrdersController = { createNewFoodOrder, getAllOrders, getSingleOrderDetails, getMyOrderedFood };
