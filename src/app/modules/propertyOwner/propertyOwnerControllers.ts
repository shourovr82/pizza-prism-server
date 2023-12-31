import { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { PropertyOwnerServices } from "./propertyOwner.service";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { propertyOwnerFilterableFields } from "./propertyOwner.constants";

// ! get all Property Owners
const getAllPropertyOwners = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, propertyOwnerFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await PropertyOwnerServices.getAllPropertyOwners(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Property Owners retrieved successful",
    data: result,
  });
});

// ! get single  property owner

const getSinglePropertyOwner = catchAsync(async (req: Request, res: Response) => {
  const propertyOwnerId = req.params?.propertyOwnerId;

  const result = await PropertyOwnerServices.getSinglePropertyOwner(propertyOwnerId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Property Owner Profile Information retrieved successful!",
    data: result,
  });
});
// ! update property owner

const UpdatePropertyOwner = catchAsync(async (req: Request, res: Response) => {
  const propertyOwnerId = req.params?.propertyOwnerId;

  const result = await PropertyOwnerServices.UpdatePropertyOwner(propertyOwnerId, req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Property owner  updated successful!",
    data: result,
  });
});

export const PropertyOwnerControllers = {
  getAllPropertyOwners,
  getSinglePropertyOwner,
  UpdatePropertyOwner,
};
