/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { IFoodMenuCreateRes, IFoodMenuUpdateRequest } from "./foodItems.interface";

type UpdateValueType = string | undefined;

type UpdateDataObject = {
  [dataName: string]: UpdateValueType;
};

export const createFoodItemData = ({ ...updates }: UpdateDataObject): IFoodMenuCreateRes => {
  const filteredUpdates: IFoodMenuCreateRes = Object.entries(updates)
    .filter(([_, value]) => value !== undefined && value !== null && !Number.isNaN(value))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as IFoodMenuCreateRes);

  return filteredUpdates;
};

//
export const updateFoodMenuData = ({ ...updates }: UpdateDataObject): IFoodMenuUpdateRequest => {
  const filteredUpdates: IFoodMenuUpdateRequest = Object.entries(updates)
    .filter(([_, value]) => value !== undefined && value !== null && !Number.isNaN(value))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as IFoodMenuUpdateRequest);

  return filteredUpdates;
};
