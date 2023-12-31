import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { PropertiesService } from './properties.service';
import pick from '../../../shared/pick';
import { propertiesFilterableFields } from './properties.constants';
import { IRequestUser } from '../../interfaces/global.interfaces';

const createNewProperty = catchAsync(async (req: Request, res: Response) => {
  //
  const profileId = (req.user as IRequestUser).profileId;

  const result = await PropertiesService.createNewProperty(profileId, req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Property created Successfully',
    data: result,
  });
});
//! get all properties =------------
const getAllProperty = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, propertiesFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await PropertiesService.getAllProperty(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Properties Successfully fetched!!!',
    meta: result.meta,
    data: result.data,
  });
});
//! get single property info
const getSinglePropertyInfo = catchAsync(
  async (req: Request, res: Response) => {
    const propertyId = req.params?.propertyId;

    const result = await PropertiesService.getSinglePropertyInfo(propertyId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Properties successfully fetched!!!',
      data: result,
    });
  }
);
// ! update property info

const updatePropertyInfo = catchAsync(async (req: Request, res: Response) => {
  const propertyId = req.params?.propertyId;
  const result = await PropertiesService.updatePropertyInfo(propertyId, req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Property Updated Successfully',
    data: result,
  });
});
export const PropertiesController = {
  createNewProperty,
  getAllProperty,
  getSinglePropertyInfo,
  updatePropertyInfo,
};
