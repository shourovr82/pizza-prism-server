/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { IServiceProviderFilterRequest, IServiceProviderUpdateRequest } from "./serviceProvider.interfaces";
import { Request } from "express";
import { IUploadFile } from "../../../interfaces/file";
import fs from "fs";
import { logger } from "../../../shared/logger";
import { Prisma, ServiceProvider } from "@prisma/client";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { serviceProviderRelationalFields, serviceProviderRelationalFieldsMapper, serviceProviderSearchableFields } from "./serviceProvider.constants";

// ! get all Service Provider
const getAllServiceProviders = async (filters: IServiceProviderFilterRequest, options: IPaginationOptions) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: serviceProviderSearchableFields.map((field: any) => ({
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
        if (serviceProviderRelationalFields.includes(key)) {
          return {
            [serviceProviderRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.ServiceProviderWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};
  //
  const result = await prisma.$transaction(async (transactionClient) => {
    const allServiceProvider = await transactionClient.serviceProvider.findMany({
      where: whereConditions,
      include: {
        user: {
          select: {
            email: true,
          },
        },
        Service: true,
      },
      skip,
      take: limit,
      orderBy:
        options.sortBy && options.sortOrder
          ? { [options.sortBy]: options.sortOrder }
          : {
              createdAt: "desc",
            },
    });

    const total = await prisma.serviceProvider.count({
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
      data: allServiceProvider,
    };
  });

  return result;
};

// ! get single Property Owner
const getSingleServiceProvider = async (serviceProviderId: string): Promise<ServiceProvider | null> => {
  const result = await prisma.$transaction(async (transactionClient) => {
    const serviceProvider = await transactionClient.serviceProvider.findUnique({
      where: {
        serviceProviderId,
      },
      include: {
        user: {
          select: {
            email: true,
            createdAt: true,
          },
        },
        Service: true,
      },
    });

    if (!serviceProvider) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Service Provider Profile Not Found!!!");
    }
    return serviceProvider;
  });

  return result;
};
// ! getServiceProviderMyProfile
const getServiceProviderMyProfile = async (serviceProviderId: string): Promise<ServiceProvider | null> => {
  const result = await prisma.$transaction(async (transactionClient) => {
    const serviceProvider = await transactionClient.serviceProvider.findUnique({
      where: {
        serviceProviderId,
      },
      include: {
        user: {
          select: {
            email: true,
            createdAt: true,
          },
        },
        Service: true,
      },
    });

    if (!serviceProvider) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Service Provider Profile Not Found!!!");
    }
    return serviceProvider;
  });

  return result;
};

// ! update service provider
const UpdateServiceProvider = async (serviceProviderId: string, req: Request) => {
  const profileImage: IUploadFile = req.file as any;
  // const profileImagePath = profileImage?.path?.substring(13);
  const profileImagePath = profileImage?.path;

  const { firstName, lastName, phoneNumber, oldProfileImagePath, companyAddress, companyEmailAddress, companyName, companyPhoneNumber } = req.body as IServiceProviderUpdateRequest;

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
    const isServiceProviderOwnerExists = await transactionClient.serviceProvider.findUnique({
      where: {
        serviceProviderId,
      },
    });

    if (!isServiceProviderOwnerExists) {
      throw new ApiError(httpStatus.NOT_FOUND, "Service Provider Profile Not Found!");
    }

    const updatedServiceProviderProfileData: Partial<ServiceProvider> = {};
    if (firstName) updatedServiceProviderProfileData["firstName"] = firstName;
    if (lastName) updatedServiceProviderProfileData["lastName"] = lastName;
    if (phoneNumber) updatedServiceProviderProfileData["phoneNumber"] = phoneNumber;
    if (profileImagePath) updatedServiceProviderProfileData["profileImage"] = profileImagePath;
    if (companyAddress) updatedServiceProviderProfileData["companyAddress"] = companyAddress;
    if (companyEmailAddress) updatedServiceProviderProfileData["companyEmailAddress"] = companyEmailAddress;
    if (companyName) updatedServiceProviderProfileData["companyName"] = companyName;
    if (companyPhoneNumber) updatedServiceProviderProfileData["companyPhoneNumber"] = companyPhoneNumber;

    // ! updating
    const res = await transactionClient.serviceProvider.update({
      where: {
        serviceProviderId,
      },
      data: updatedServiceProviderProfileData,
    });

    if (!res) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Service Provider Profile Updating Failed !");
    }

    return res;
  });
  return result;
};

export const ServiceProviderServices = { getAllServiceProviders, getSingleServiceProvider, UpdateServiceProvider, getServiceProviderMyProfile };
