import { Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../../config";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IRefreshTokenResponse } from "./users.interface";
import { AuthService } from "./users.service";

//! customer User Create

const createNewUserForCustomer = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.createNewUserForCustomer(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer User created successfully!",
    data: result,
  });
});
//! super admin User Create

const createSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.createSuperAdmin(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Super Admin created successfully!",
    data: result,
  });
});

//User Login

const userLogin = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.userLogin(req.body);

  const { accessToken, refreshToken } = result;
  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Logged in successfully!",
    data: {
      accessToken,
    },
  });
});

// refreshToken -------------------------

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthService.refreshToken(refreshToken);

  //! set refresh token into cookie
  // const cookieOptions = {
  //   secure: config.env === 'production',
  //   httpOnly: true,
  // };
  // res.cookie('refreshToken', refreshToken, cookieOptions);

  // ! sending response
  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Logged in successfully !",
    data: result,
  });
});

export const UserCustomersController = {
  createNewUserForCustomer,
  userLogin,
  refreshToken,
  createSuperAdmin,
};
