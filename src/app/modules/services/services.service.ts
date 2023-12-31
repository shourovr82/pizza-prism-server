/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { Prisma, Service } from "@prisma/client";
import { IServiceFilterRequest, IServiceUpdateRequest } from "./services.interfaces";
import { updateServiceData } from "./services.utils";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { servicesRelationalFields, servicesRelationalFieldsMapper, servicesSearchableFields } from "./services.constants";

// ! get all services
const getAllServices = async (filters: IServiceFilterRequest, options: IPaginationOptions) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: servicesSearchableFields.map((field: any) => ({
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
        if (servicesRelationalFields.includes(key)) {
          return {
            [servicesRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.ServiceWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};
  //
  const result = await prisma.$transaction(async (transactionClient) => {
    const allServices = await transactionClient.service.findMany({
      include: {
        owner: true,
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

    const total = await prisma.service.count({
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
      data: allServices,
    };
  });

  return result;
};
// ! createOrUpdateService
const createOrUpdateService = async (profileId: string, payload: IServiceUpdateRequest): Promise<Service> => {
  // updated data from request
  const newServiceData: Partial<Service> = updateServiceData(payload);

  // !
  const result = await prisma.$transaction(async (transactionClient) => {
    //

    const property = await transactionClient.service.upsert({
      where: { ownerId: profileId },
      update: newServiceData,
      create: {
        ownerId: profileId,
        ...newServiceData,
      },
      include: {
        owner: true,
      },
    });
    if (!property) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Service Update Failed !");
    }
    return property;
  });
  return result;
};
// ! createOrUpdateService
const getSingleService = async (serviceId: string): Promise<Service> => {
  // updated data from request

  // !
  const result = await prisma.$transaction(async (transactionClient) => {
    //
    const serviceInfo = await transactionClient.service.findUnique({
      where: {
        serviceId,
      },

      include: {
        owner: true,
      },
    });
    if (!serviceInfo) {
      throw new ApiError(httpStatus.NOT_FOUND, "Service not found !");
    }
    return serviceInfo;
  });
  return result;
};

export const ServicesService = { getAllServices, createOrUpdateService, getSingleService };
