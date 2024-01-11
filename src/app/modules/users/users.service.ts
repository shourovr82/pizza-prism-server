/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Prisma, Profile } from "@prisma/client";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import { IProfileUpdateRequest, IUserFilterRequest } from "./users.interface";
import { usersRelationalFields, usersRelationalFieldsMapper, usersSearchableFields } from "./users.constants";
import { Request } from "express";
import { IUploadFile } from "../../../interfaces/file";
import ApiError from "../../../errors/ApiError";
import { deleteOldImage } from "../../../helpers/deleteOldImage";
import httpStatus from "http-status";
import { updateTenantData } from "./users.utils";

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
// ! updateProfileDetails

const updateProfileDetails = async (profileId: string, req: Request) => {
  const profileImage: IUploadFile = req.file as any;
  const profileImagePath = profileImage?.path?.substring(13);

  const { firstName, lastName, email, phoneNumber, role, oldProfileImagePath, ...updates } = req.body as IProfileUpdateRequest;

  const profileReqData: any = {
    firstName,
    lastName,
    phoneNumber,
    profileImage: profileImagePath,
    ...updates,
  };

  //!
  const result = await prisma.$transaction(async (transactionClient) => {
    const isProfileExists = await transactionClient.profile.findUnique({
      where: {
        profileId,
      },
      select: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });
    // Check if email is provided before including it in the update
    if (email !== undefined && email !== null && isProfileExists?.user?.email !== email) {
      // if email exist
      const isEmailExist = await transactionClient.user.findUnique({
        where: {
          email,
        },
      });

      if (isEmailExist) throw new ApiError(httpStatus.CONFLICT, "Email is already used");
      else
        profileReqData.user = {
          update: {
            email,
          },
        };
    }
    // if role
    if (role !== undefined && role !== null) profileReqData.user = { update: { role } };

    //! deleting old  Image
    if (profileImagePath) deleteOldImage(oldProfileImagePath, profileImagePath);

    if (!isProfileExists) throw new ApiError(httpStatus.NOT_FOUND, "Profile Not Found!");

    // updated data from request
    const newUpdatedData: Partial<IProfileUpdateRequest> = updateTenantData(profileReqData);

    // ! updating
    const res = await transactionClient.profile.update({
      where: {
        profileId,
      },
      data: newUpdatedData,
      include: {
        user: {
          select: {
            email: true,
            role: true,
            userStatus: true,
          },
        },
      },
    });

    if (!res) throw new ApiError(httpStatus.BAD_REQUEST, "Profile Updating Failed !");

    return res;
  });
  return result;
};

export const UserService = {
  getAllUsers,
  updateProfileDetails,
};
