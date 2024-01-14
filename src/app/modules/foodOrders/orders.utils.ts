/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { FoodItem } from "@prisma/client";
import { IFoodItemCreateRes, IFoodItemUpdateRequest } from "./orders.interface";

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

// calculate
type IFoodItemCalculate = {
  foodItemId: string;
  quantity?: number;
  currentPrice?: number;
};

export const calculateTotalAmount = (existingFoodItems: FoodItem[], orderItems: IFoodItemCalculate[]): number => {
  return existingFoodItems.reduce((acc, foodItem) => {
    const orderItem = orderItems.find((item) => item?.foodItemId === foodItem?.foodItemId);
    if (orderItem) {
      const quantity = orderItem?.quantity ?? 0;
      const currentPrice = foodItem?.currentPrice ?? 0;
      acc += quantity * currentPrice;
    }
    return acc;
  }, 0);
};
