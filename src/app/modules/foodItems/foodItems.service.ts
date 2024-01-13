/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { FoodMenu, Prisma } from "@prisma/client";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import { Request } from "express";
import { IUploadFile } from "../../../interfaces/file";
import ApiError from "../../../errors/ApiError";
import { deleteOldImage } from "../../../helpers/deleteOldImage";
import httpStatus from "http-status";
import { IFoodItemCreateRequest, IFoodItemCreateRes, IFoodItemUpdateRequest, IUserFilterRequest } from "./foodItems.interface";
import { foodItemRelationalFields, foodItemRelationalFieldsMapper, foodItemSearchableFields } from "./foodItems.constants";
import { updateFoodMenuData } from "./foodItems.utils";
// ! create food menu

const createFoodItems = async (req: Request) => {
  const foodItemImage: IUploadFile = req.file as any;
  const foodItemImagePath = foodItemImage?.path?.substring(13);

  const { foodMenuId, ...newData } = req.body as IFoodItemCreateRequest;

  const foodItemReqData: IFoodItemCreateRes = {
    foodMenuId,
    foodImage: foodItemImagePath,
    ...newData,
  };

  //!
  const result = await prisma.$transaction(async (transactionClient) => {
    const isExistFoodMenu = await transactionClient.foodMenu.findUnique({
      where: {
        foodMenuId,
      },
    });

    if (!isExistFoodMenu) throw new ApiError(httpStatus.NOT_FOUND, "Food Menu is not Found !");
    // updated data from request
    // ! updating
    const res = await transactionClient.foodItem.create({
      data: foodItemReqData,
      include: {
        foodMenu: true,
      },
    });

    if (!res) throw new ApiError(httpStatus.BAD_REQUEST, "Food Item creating Failed !");

    return res;
  });
  return result;
};
//! GET ALL getAllFoodMenu
const getAllFoodItems = async (filters: IUserFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<FoodMenu[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: foodItemSearchableFields.map((field: any) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        if (foodItemRelationalFields.includes(key)) {
          console.log(key);
          return {
            user: {
              [foodItemRelationalFieldsMapper[key]]: {
                equals: (filterData as any)[key],
              },
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  // @ts-ignore
  const whereConditions: Prisma.FoodMenuWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.foodMenu.findMany({
    include: {
      _count: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.foodMenu.count({
    where: whereConditions,
  });
  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  };
};
// ! update food menu Details

const updateFoodItemsDetails = async (foodItemId: string, req: Request) => {
  const foodItemImage: IUploadFile = req.file as any;
  const foodItemImagePath = foodItemImage?.path?.substring(13);

  const { oldFoodImagePath, ...updates } = req.body as IFoodItemUpdateRequest;

  const foodMenuReqData: any = {
    foodImage: foodItemImagePath,
    ...updates,
  };

  //!
  const result = await prisma.$transaction(async (transactionClient) => {
    const isExistFoodItem = await transactionClient.foodItem.findUnique({
      where: {
        foodItemId,
      },
    });

    if (!isExistFoodItem) throw new ApiError(httpStatus.NOT_FOUND, "Food Menu Not Found !!");
    //! deleting old  Image
    if (foodItemImagePath && oldFoodImagePath) deleteOldImage(oldFoodImagePath, foodItemImagePath);

    // updated data from request
    const newUpdatedData: Partial<IFoodItemUpdateRequest> = updateFoodMenuData(foodMenuReqData);

    // ! updating
    const res = await transactionClient.foodItem.update({
      where: {
        foodItemId,
      },
      data: newUpdatedData,
    });

    if (!res) throw new ApiError(httpStatus.BAD_REQUEST, "Food Menu Updating Failed !");

    return res;
  });
  return result;
};

export const FoodItemService = { createFoodItems, getAllFoodItems, updateFoodItemsDetails };
