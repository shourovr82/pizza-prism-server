/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";
import { ILoginUserResponse, IRefreshTokenResponse, IUserCreate, IUserLogin } from "./users.interface";
import { UserRoles, UserStatus } from "@prisma/client";
import { userFindUnique } from "./users.utils";

//! customer User Create

const createNewUserForCustomer = async (payload: IUserCreate) => {
  const { password, email } = payload;
  const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

  const newUser = await prisma.$transaction(async (transactionClient) => {
    await userFindUnique(email, transactionClient);

    const createdUser = await transactionClient.user.create({
      data: {
        email,
        password: hashedPassword,
        role: UserRoles.CUSTOMER,
        userStatus: UserStatus.ACTIVE,
      },
    });

    if (!createdUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User creation failed");
    }

    const tenantData: any = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      user: {
        connect: {
          userId: createdUser.userId,
        },
      },
      // profileImage: payload?.profileImage,
    };

    const tenantUser = await transactionClient.customer.create({
      data: tenantData,
      select: {
        firstName: true,
        lastName: true,
        customerId: true,
        userId: true,
        user: {
          select: {
            email: true,
            role: true,
            userStatus: true,
          },
        },
      },
    });

    if (!tenantUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Tenant creation failed");
    }

    return tenantUser;
  });

  return newUser;
};

//! super admin User Create

const createSuperAdmin = async (payload: IUserCreate) => {
  const { password, email, userStatus } = payload;
  const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

  const result = await prisma.$transaction(async (transactionClient) => {
    await userFindUnique(email, transactionClient);

    const createdUser = await transactionClient.user.create({
      data: {
        email,
        password: hashedPassword,
        role: UserRoles.SUPERADMIN,
        userStatus,
      },
    });

    if (!createdUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User creation failed");
    }

    const adminUser = await transactionClient.superAdmin.create({
      data: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        user: {
          connect: {
            userId: createdUser.userId,
          },
        },
      },
      select: {
        firstName: true,
        lastName: true,
        userId: true,
        superAdminId: true,
        user: {
          select: {
            email: true,
            role: true,
            userStatus: true,
          },
        },
      },
    });

    if (!adminUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Super Admin creation failed");
    }

    return adminUser;
  });

  return result;
};

//login
const userLogin = async (loginData: IUserLogin): Promise<ILoginUserResponse> => {
  const { email, password } = loginData;

  const isUserExist = await prisma.user.findFirst({
    where: {
      email,
    },
    include: {
      customer: {
        select: {
          firstName: true,
          lastName: true,
          customerId: true,
        },
      },
      superAdmin: {
        select: {
          firstName: true,
          lastName: true,
          superAdminId: true,
        },
      },
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found !!");
  }

  const isPasswordValid = await bcrypt.compare(password, isUserExist?.password);

  if (isUserExist && !isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect !!");
  }

  const { userId, customer, superAdmin, role, userStatus, email: loggedInEmail } = isUserExist;

  // create access token & refresh token
  const accessToken = jwtHelpers.createToken(
    {
      userId,
      role,
      profileId: customer?.customerId || superAdmin?.superAdminId,
      email: loggedInEmail,
      userStatus,
      firstName: customer?.firstName || superAdmin?.firstName,
      lastName: customer?.lastName || superAdmin?.lastName,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );
  const refreshToken = jwtHelpers.createToken(
    {
      userId,
      role,
      profileId: customer?.customerId || superAdmin?.superAdminId,
      email: loggedInEmail,
      userStatus,
      firstName: customer?.firstName || superAdmin?.firstName,
      lastName: customer?.lastName || superAdmin?.lastName,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

// !refreshToken --------------------------------
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // ! verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(token, config.jwt.refresh_secret as Secret);
  } catch (error) {
    // err
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token");
  }
  //! if user not exist
  // !checking deleted user's refresh token
  const { userId } = verifiedToken;

  const isUserExist = await prisma.user.findFirst({
    where: {
      userId,
    },
    include: {
      customer: {
        select: {
          firstName: true,
          lastName: true,
          customerId: true,
        },
      },
      superAdmin: {
        select: {
          firstName: true,
          lastName: true,
          superAdminId: true,
        },
      },
    },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exists!!");
  }

  const { customer, superAdmin, role, userStatus, email: loggedInEmail } = isUserExist;
  // generate new token
  const newAccessToken = jwtHelpers.createToken(
    {
      userId,
      role,
      profileId: customer?.customerId || superAdmin?.superAdminId,
      email: loggedInEmail,
      userStatus,
      firstName: customer?.firstName || superAdmin?.firstName,
      lastName: customer?.lastName || superAdmin?.lastName,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  createNewUserForCustomer,
  createSuperAdmin,
  userLogin,
  refreshToken,
};
