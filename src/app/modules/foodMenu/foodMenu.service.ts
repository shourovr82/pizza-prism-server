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
import { IFoodMenuCreateRequest, IFoodMenuCreateRes, IFoodMenuUpdateRequest, IUserFilterRequest } from "./foodMenu.interface";
import { foodMenuRelationalFields, foodMenuRelationalFieldsMapper, foodMenuSearchableFields } from "./foodMenu.constants";
import { createFoodMenuData, updateFoodMenuData } from "./foodMenu.utils";
// ! create food menu

const createFoodMenu = async (req: Request) => {
  const foodMenuImage: IUploadFile = req.file as any;
  const foodMenuImagePath = foodMenuImage?.path?.substring(13);

  const { ...updates } = req.body as IFoodMenuCreateRequest;

  const foodMenuReqData: any = {
    menuImage: foodMenuImagePath,
    ...updates,
  };

  //!
  const result = await prisma.$transaction(async (transactionClient) => {
    // updated data from request
    const newUpdatedData: IFoodMenuCreateRes = createFoodMenuData(foodMenuReqData);

    // ! updating
    const res = await transactionClient.foodMenu.create({
      data: newUpdatedData,
    });

    if (!res) throw new ApiError(httpStatus.BAD_REQUEST, "Food Menu creating Failed !");

    return res;
  });
  return result;
};
//! GET ALL getAllFoodMenu
const getAllFoodMenu = async (filters: IUserFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<FoodMenu[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: foodMenuSearchableFields.map((field: any) => ({
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
        if (foodMenuRelationalFields.includes(key)) {
          console.log(key);
          return {
            user: {
              [foodMenuRelationalFieldsMapper[key]]: {
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

const updateFoodMenuDetails = async (foodMenuId: string, req: Request) => {
  const foodMenuImage: IUploadFile = req.file as any;
  const foodMenuImagePath = foodMenuImage?.path?.substring(13);

  const { oldMenuImagePath, ...updates } = req.body as IFoodMenuUpdateRequest;

  const foodMenuReqData: any = {
    menuImage: foodMenuImagePath,
    ...updates,
  };

  //!
  const result = await prisma.$transaction(async (transactionClient) => {
    const isExistFoodMenu = await transactionClient.foodMenu.findUnique({
      where: {
        foodMenuId,
      },
    });

    if (!isExistFoodMenu) throw new ApiError(httpStatus.NOT_FOUND, "Food Menu Not Found !!");
    //! deleting old  Image
    if (foodMenuImagePath && oldMenuImagePath) deleteOldImage(oldMenuImagePath, foodMenuImagePath);

    // updated data from request
    const newUpdatedData: Partial<IFoodMenuUpdateRequest> = updateFoodMenuData(foodMenuReqData);

    // ! updating
    const res = await transactionClient.foodMenu.update({
      where: {
        foodMenuId,
      },
      data: newUpdatedData,
    });

    if (!res) throw new ApiError(httpStatus.BAD_REQUEST, "Food Menu Updating Failed !");

    return res;
  });
  return result;
};

export const FoodMenuService = { createFoodMenu, getAllFoodMenu, updateFoodMenuDetails };
