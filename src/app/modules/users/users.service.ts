/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Prisma, Profile } from "@prisma/client";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import { IUserFilterRequest } from "./users.interface";
import { usersRelationalFields, usersRelationalFieldsMapper, usersSearchableFields } from "./users.constants";

//! GET ALL getAllUsers
const getAllUsers = async (filters: IUserFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Profile[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: usersSearchableFields.map((field: any) => ({
        [field]:
          field === "user"
            ? {
                email: {
                  contains: searchTerm,
                  mode: "insensitive",
                },
              }
            : {
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
          console.log(key);
          return {
            user: {
              [usersRelationalFieldsMapper[key]]: {
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

  const total = await prisma.profile.count({
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
