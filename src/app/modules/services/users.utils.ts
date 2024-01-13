/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IProfileUpdateRequest } from "../restaurantInformation/restaurantInformation.interface";

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

type UpdateValueType = string | number | boolean | undefined;

type UpdateDataObject = {
  [dataName: string]: UpdateValueType;
};

export const updateTenantData = (updates: UpdateDataObject): Partial<IProfileUpdateRequest> => {
  const filteredUpdates = Object.entries(updates)
    .filter(([_, value]) => value !== undefined && value !== null && !Number.isNaN(value))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  return {
    ...filteredUpdates,
  };
};
