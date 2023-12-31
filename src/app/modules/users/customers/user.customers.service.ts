/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import prisma from "../../../../shared/prisma";
import { IPaginationOptions } from "../../../../interfaces/pagination";
import { IGenericResponse } from "../../../../interfaces/common";
import { Prisma, Profile } from "@prisma/client";
import { ICustomerFilterRequest } from "./user.customers.interfaces";
import { paginationHelpers } from "../../../../helpers/paginationHelper";
import { customersRelationalFields, customersRelationalFieldsMapper, customersSearchableFields } from "./user.customers.constants";

//! GET ALL CUSTOMERS
const getAllCustomers = async (filters: ICustomerFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Profile[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: customersSearchableFields.map((field: any) => ({
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
        if (customersRelationalFields.includes(key)) {
          return {
            [customersRelationalFieldsMapper[key]]: {
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

  // @ts-ignore
  const whereConditions: Prisma.ProfileWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.profile.findMany({
    include: {
      user: {
        select: {
          email: true,
          role: true,
          userStatus: true,
        },
      },
    },
    where: {
      user: {
        role: {
          equals: "CUSTOMER",
        },
      },
      ...whereConditions,
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
  const total = await prisma.profile.count({
    where: {
      ...whereConditions,
      user: {
        role: {
          equals: "CUSTOMER",
        },
      },
    },
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

export const UserCustomerService = {
  getAllCustomers,
};
