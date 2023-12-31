import { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { TenantServices } from "./tenants.service";
import pick from "../../../shared/pick";
import { tenantsFilterableFields } from "./tenants.constants";
import { IRequestUser } from "../../interfaces/global.interfaces";
// ! get all tenants
const getAllTenants = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, tenantsFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await TenantServices.getAllTenants(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Tenants fetching successful",
    data: result,
  });
});
// ! get single tenant
const getSingleTenant = catchAsync(async (req: Request, res: Response) => {
  const tenantId = req.params?.tenantId;
  const result = await TenantServices.getSingleTenant(tenantId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Tenant retrieved Successful",
    data: result,
  });
});
// ! get  tenant my profile
const getTenantMyProfile = catchAsync(async (req: Request, res: Response) => {
  const tenantId = (req.user as IRequestUser).profileId;
  const result = await TenantServices.getSingleTenant(tenantId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Tenant my profile retrieved Successful",
    data: result,
  });
});
// ! update tenant profile
const updateTenantProfile = catchAsync(async (req: Request, res: Response) => {
  const tenantId = req.params?.tenantId;

  const result = await TenantServices.updateTenantProfile(tenantId, req);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Property owner created or update successful!",
    data: result,
  });
});
export const TenantsControllers = {
  getAllTenants,
  updateTenantProfile,
  getTenantMyProfile,
  getSingleTenant,
};
