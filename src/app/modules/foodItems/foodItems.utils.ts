/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { IFoodItemCreateRes, IFoodItemUpdateRequest } from "./foodItems.interface";

type UpdateValueType = string | undefined;

type UpdateDataObject = {
  [dataName: string]: UpdateValueType;
};

export const createFoodItemData = ({ ...updates }: UpdateDataObject): IFoodItemCreateRes => {
  const filteredUpdates: IFoodItemCreateRes = Object.entries(updates)
    .filter(([_, value]) => value !== undefined && value !== null && !Number.isNaN(value))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as IFoodItemCreateRes);

  return filteredUpdates;
};

//
export const updateFoodItemData = ({ ...updates }: UpdateDataObject): IFoodItemUpdateRequest => {
  const filteredUpdates: IFoodItemUpdateRequest = Object.entries(updates)
    .filter(([_, value]) => value !== undefined && value !== null && !Number.isNaN(value))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as IFoodItemUpdateRequest);

  return filteredUpdates;
};
