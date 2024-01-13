import { IRestaurantCreateOrUpdateRequest } from "./restaurantInformation.interface";

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
