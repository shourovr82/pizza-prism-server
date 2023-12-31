import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../../shared/catchAsync";
import { UserCustomerService } from "./user.customers.service";
import sendResponse from "../../../../shared/sendResponse";
import pick from "../../../../shared/pick";
import { customersFilterableFields } from "./user.customers.constants";

// ! GET ALL CUSTOMERS
const getAllCustomers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, customersFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await UserCustomerService.getAllCustomers(filters, options);
  //
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Customers retrieved successfully!",
    meta: result.meta,
    data: result.data,
  });
});

export const UserCustomersController = {
  getAllCustomers,
};
