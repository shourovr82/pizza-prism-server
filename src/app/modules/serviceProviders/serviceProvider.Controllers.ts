import { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { ServiceProviderServices } from "./serviceProvider.service";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { serviceProviderFilterableFields } from "./serviceProvider.constants";
import { IRequestUser } from "../../interfaces/global.interfaces";

// ! get all Service Providers
const getAllServiceProviders = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, serviceProviderFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await ServiceProviderServices.getAllServiceProviders(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service Providers retrieved successful",
    data: result,
  });
});

// ! get single  service provider
const getSingleServiceProvider = catchAsync(async (req: Request, res: Response) => {
  const serviceProviderId = req.params?.serviceProviderId;

  const result = await ServiceProviderServices.getSingleServiceProvider(serviceProviderId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service Provider Profile Information retrieved successful!",
    data: result,
  });
});
// ! getServiceProviderMyProfile
const getServiceProviderMyProfile = catchAsync(async (req: Request, res: Response) => {
  const serviceProviderId = (req.user as IRequestUser).profileId;
  const result = await ServiceProviderServices.getSingleServiceProvider(serviceProviderId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service Provider My Profile Information retrieved successful!",
    data: result,
  });
});

// ! update service provider
const UpdateServiceProvider = catchAsync(async (req: Request, res: Response) => {
  const serviceProviderId = req.params?.serviceProviderId;

  const result = await ServiceProviderServices.UpdateServiceProvider(serviceProviderId, req);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Property owner created or update successful!",
    data: result,
  });
});

export const ServiceProviderControllers = { getAllServiceProviders, getSingleServiceProvider, UpdateServiceProvider, getServiceProviderMyProfile };
