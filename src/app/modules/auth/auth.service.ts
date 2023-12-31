/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";
import { ILoginUserResponse, IRefreshTokenResponse, IUserCreate, IUserCreateForAdmin, IUserLogin } from "./auth.interface";
import { UserRoles, UserStatus } from "@prisma/client";
import { userFindUnique } from "./auth.utils";

//! customer User Create

const createNewUser = async (payload: IUserCreate) => {
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

    const newProfile = await transactionClient.profile.create({
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
        profileId: true,
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

    if (!newProfile) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Profile creation failed");
    }

    return newProfile;
  });

  return newUser;
};
//! other User Create

const createOtherUser = async (payload: IUserCreateForAdmin) => {
  const { password, email, role } = payload;
  const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

  const newUser = await prisma.$transaction(async (transactionClient) => {
    await userFindUnique(email, transactionClient);

    const createdUser = await transactionClient.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        userStatus: UserStatus.ACTIVE,
      },
    });

    if (!createdUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User creation failed");
    }

    const newProfile = await transactionClient.profile.create({
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
        profileId: true,
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

    if (!newProfile) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Profile creation failed");
    }

    return newProfile;
  });

  return newUser;
};

//login
const userLogin = async (loginData: IUserLogin): Promise<ILoginUserResponse> => {
  const { email, password } = loginData;

  const isUserExist = await prisma.user.findFirst({
    where: {
      email,
    },
    include: {
      profile: true,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found !!");
  }

  const isPasswordValid = await bcrypt.compare(password, isUserExist?.password);

  if (isUserExist && !isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect !!");
  }

  const { userId, profile, role, userStatus, email: loggedInEmail } = isUserExist;

  // create access token & refresh token
  const accessToken = jwtHelpers.createToken(
    {
      userId,
      role,
      profileId: profile?.profileId,
      email: loggedInEmail,
      userStatus,
      firstName: profile?.firstName,
      lastName: profile?.lastName,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );
  const refreshToken = jwtHelpers.createToken(
    {
      userId,
      role,
      profileId: profile?.profileId,
      email: loggedInEmail,
      userStatus,
      firstName: profile?.firstName,
      lastName: profile?.lastName,
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
      profile: true,
    },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exists!!");
  }

  const { profile, role, userStatus, email: loggedInEmail } = isUserExist;
  // generate new token
  const newAccessToken = jwtHelpers.createToken(
    {
      userId,
      role,
      profileId: profile?.profileId,
      email: loggedInEmail,
      userStatus,
      firstName: profile?.firstName,
      lastName: profile?.lastName,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = { createNewUser, userLogin, refreshToken, createOtherUser };
