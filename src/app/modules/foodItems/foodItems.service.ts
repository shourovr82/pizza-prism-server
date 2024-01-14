/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { FoodItem, Prisma } from "@prisma/client";
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
import { updateFoodItemData } from "./foodItems.utils";
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
const getAllFoodItems = async (filters: IUserFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<FoodItem[]>> => {
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
  const whereConditions: Prisma.FoodItemWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.foodItem.findMany({
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

  const total = await prisma.foodItem.count({
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
// ! get single food Item

const getSingleFoodItemsDetails = async (foodItemId: string) => {
  //!
  const result = await prisma.$transaction(async (transactionClient) => {
    // ! is Exist item
    const isExistFoodItem = await transactionClient.foodItem.findUnique({
      where: {
        foodItemId,
      },
      include: {
        _count: true,
        foodMenu: true,
        nutritionalInfo: true,
        reviews: true,
      },
    });

    if (!isExistFoodItem) throw new ApiError(httpStatus.NOT_FOUND, "Food Item Not Found !!");

    return isExistFoodItem;
  });
  return result;
};
// ! update food menu Details

const updateFoodItemsDetails = async (foodItemId: string, req: Request) => {
  const foodItemImage: IUploadFile = req.file as any;
  const foodItemImagePath = foodItemImage?.path?.substring(13);

  const { oldFoodImagePath, availability, ...updates } = req.body as IFoodItemUpdateRequest;

  //!
  const result = await prisma.$transaction(async (transactionClient) => {
    // ! is Exist item
    const isExistFoodItem = await transactionClient.foodItem.findUnique({
      where: {
        foodItemId,
      },
    });

    if (!isExistFoodItem) throw new ApiError(httpStatus.NOT_FOUND, "Food Item Not Found !!");
    //! deleting old  Image
    if (foodItemImagePath && oldFoodImagePath) deleteOldImage(oldFoodImagePath, foodItemImagePath);

    // updated data from request
    const foodItemUpdateReqData: any = {
      availability,
      foodImage: foodItemImagePath,
      ...updates,
    };

    if (availability === false) foodItemUpdateReqData["availableQuantity"] = 0;

    const newUpdatedData: Partial<IFoodItemUpdateRequest> = updateFoodItemData(foodItemUpdateReqData);

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

export const FoodItemService = { createFoodItems, getAllFoodItems, updateFoodItemsDetails, getSingleFoodItemsDetails };
