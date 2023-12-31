/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Prisma, User } from "@prisma/client";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import { IUserFilterRequest } from "./users.interface";
import { usersRelationalFields, usersRelationalFieldsMapper, usersSearchableFields } from "./users.constants";

//! GET ALL getAllUsers
const getAllUsers = async (filters: IUserFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<User[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: usersSearchableFields.map((field: any) => ({
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
        if (usersRelationalFields.includes(key)) {
          return {
            [usersRelationalFieldsMapper[key]]: {
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
  const whereConditions: Prisma.UserWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
    include: {
      customer: {
        select: {
          createdAt: true,
          customerId: true,
          firstName: true,
          lastName: true,
          phoneNumber: true,
          profileImage: true,
          updatedAt: true,
        },
      },
      superAdmin: {
        select: {
          createdAt: true,
          superAdminId: true,
          firstName: true,
          lastName: true,
          phoneNumber: true,
          profileImage: true,
          updatedAt: true,
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
  const total = await prisma.user.count({
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

export const UserService = {
  getAllUsers,
};
