/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { IPropertyOwnerFilterRequest, IPropertyOwnerUpdateRequest } from "./propertyOwner.interfaces";
import { Request } from "express";
import { IUploadFile } from "../../../interfaces/file";
import fs from "fs";
import { logger } from "../../../shared/logger";
import { Prisma, PropertyOwner } from "@prisma/client";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { propertyOwnerRelationalFields, propertyOwnerRelationalFieldsMapper, propertyOwnerSearchableFields } from "./propertyOwner.constants";

// ! get all property owners
const getAllPropertyOwners = async (filters: IPropertyOwnerFilterRequest, options: IPaginationOptions) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: propertyOwnerSearchableFields.map((field: any) => ({
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
        if (propertyOwnerRelationalFields.includes(key)) {
          return {
            [propertyOwnerRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
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

  const whereConditions: Prisma.PropertyOwnerWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};
  //
  const result = await prisma.$transaction(async (transactionClient) => {
    const allPropertyOwner = await transactionClient.propertyOwner.findMany({
      include: {
        user: {
          select: {
            email: true,
          },
        },
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

    const total = await prisma.propertyOwner.count({
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
      data: allPropertyOwner,
    };
  });

  return result;
};

// ! get single Property Owner
const getSinglePropertyOwner = async (propertyOwnerId: string): Promise<PropertyOwner | null> => {
  const result = await prisma.$transaction(async (transactionClient) => {
    const propertyOwner = await transactionClient.propertyOwner.findUnique({
      where: {
        propertyOwnerId,
      },
      include: {
        user: {
          select: {
            email: true,
            createdAt: true,
          },
        },
        Property: true,
      },
    });

    if (!propertyOwner) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Property Owner Profile Not Found!!!");
    }
    return propertyOwner;
  });

  return result;
};

// ! update property owner profile

const UpdatePropertyOwner = async (
  propertyOwnerId: string,
  req: Request,
  // payload: IPropertyOwner
) => {
  const profileImage: IUploadFile = req.file as any;
  // const profileImagePath = profileImage?.path?.substring(13);
  const profileImagePath = profileImage?.path;

  const { firstName, lastName, phoneNumber, oldProfileImagePath } = req.body as IPropertyOwnerUpdateRequest;

  // deleting old style Image
  const oldFilePaths = "uploads/" + oldProfileImagePath;

  if (oldProfileImagePath !== undefined && profileImagePath !== undefined) {
    fs.unlink(oldFilePaths, (err) => {
      if (err) {
        logger.info("Error deleting old file");
      }
    });
  }

  //!
  const result = await prisma.$transaction(async (transactionClient) => {
    const isPropertyOwnerExists = await transactionClient.propertyOwner.findUnique({
      where: {
        propertyOwnerId,
      },
    });

    if (!isPropertyOwnerExists) {
      throw new ApiError(httpStatus.NOT_FOUND, "Property Owner Not Found!");
    }

    const updatedPropertyOwnerProfileData: Partial<PropertyOwner> = {};
    if (firstName) updatedPropertyOwnerProfileData["firstName"] = firstName;
    if (lastName) updatedPropertyOwnerProfileData["lastName"] = lastName;
    if (phoneNumber) updatedPropertyOwnerProfileData["phoneNumber"] = phoneNumber;
    if (profileImagePath) updatedPropertyOwnerProfileData["profileImage"] = profileImagePath;

    // ! updating
    const res = await transactionClient.propertyOwner.update({
      where: {
        propertyOwnerId,
      },
      data: updatedPropertyOwnerProfileData,
    });

    if (!res) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Property Owner Updating Failed !");
    }

    return res;
  });
  return result;
};

export const PropertyOwnerServices = {
  getAllPropertyOwners,
  getSinglePropertyOwner,
  UpdatePropertyOwner,
};
