import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { usersFilterableFields } from "./users.constants";
import { UserService } from "./users.service";

// ! GET ALL CUSTOMERS
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, usersFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await UserService.getAllUsers(filters, options);
  //
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Users retrieved successfully!",
    meta: result.meta,
    data: result.data,
  });
});
// update user details
const updateProfileDetails = catchAsync(async (req: Request, res: Response) => {
  const profileId = req.params?.profileId;
  const result = await UserService.updateProfileDetails(profileId, req);
  //
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Update successfully!",
    data: result,
  });
});

export const UsersController = {
  getAllUsers,
  updateProfileDetails,
};
