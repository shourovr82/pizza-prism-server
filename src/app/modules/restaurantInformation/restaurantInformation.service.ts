/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import prisma from "../../../shared/prisma";
import { Request } from "express";
import { IUploadFile } from "../../../interfaces/file";
import ApiError from "../../../errors/ApiError";
import { deleteOldImage } from "../../../helpers/deleteOldImage";
import httpStatus from "http-status";

import { updateRestaurantData } from "./restaurantInformation.utils";
import { IRestaurantCreateOrUpdateRequest } from "./restaurantInformation.interface";

// ! updateRestaurantDetails

const updateRestaurantDetails = async (req: Request) => {
  const uploadedLogo: IUploadFile = req.file as any;
  const restaurantLogoPath = uploadedLogo?.path?.substring(13);

  const { oldLogoPath, ...updates } = req.body as IRestaurantCreateOrUpdateRequest;

  const restaurantReqData: any = { restaurantLogo: restaurantLogoPath, ...updates };

  //!
  const result = await prisma.$transaction(async (transactionClient) => {
    //! deleting old  Image
    if (restaurantLogoPath && oldLogoPath) deleteOldImage(oldLogoPath, restaurantLogoPath);

    // updated data from request
    const newUpdatedData: IRestaurantCreateOrUpdateRequest = updateRestaurantData(restaurantReqData);

    // ! updating
    const res = await transactionClient.restaurantInformation.upsert({
      where: { id: 1 },
      update: newUpdatedData,
      create: newUpdatedData,
    });

    if (!res) throw new ApiError(httpStatus.BAD_REQUEST, "Restaurant Updating Failed !");

    return res;
  });
  return result;
};
const getRestaurantDetails = async () => {
  //!
  const result = await prisma.$transaction(async (transactionClient) => {
    //! deleting old  Image

    // ! updating
    const res = await transactionClient.restaurantInformation.findFirst({});

    return res;
  });
  return result;
};

export const RestaurantService = {
  updateRestaurantDetails,
  getRestaurantDetails,
};
