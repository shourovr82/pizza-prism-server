/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { IServiceUpdateRequest } from "./services.interfaces";

type UpdateValueType = string | number | boolean;

type UpdateDataObject = {
  [dataName: string]: UpdateValueType;
};

export const updateServiceData = (updates: UpdateDataObject): Partial<IServiceUpdateRequest> => {
  const filteredUpdates = Object.entries(updates)
    .filter(([_, value]) => value !== undefined && value !== null && !Number.isNaN(value))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  return {
    ...filteredUpdates,
  };
};
