/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IRestaurantCreateOrUpdateRequest } from "./restaurantInformation.interface";

export const userFindUnique = async (email: string, transactionClient: any) => {
  // transaction start

  const isUserExist = await transactionClient.user.findFirst({
    where: { email },
  });

  if (isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email is already in use");
  }
};
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

type UpdateValueType = string | undefined;

type UpdateDataObject = {
  [dataName: string]: UpdateValueType;
};

export const updateRestaurantData = ({ restaurantLogo, ...updates }: UpdateDataObject): IRestaurantCreateOrUpdateRequest => {
  const filteredUpdates: IRestaurantCreateOrUpdateRequest = Object.entries(updates)
    .filter(([_, value]) => value !== undefined && value !== null && !Number.isNaN(value))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as IRestaurantCreateOrUpdateRequest);

  return filteredUpdates;
};
