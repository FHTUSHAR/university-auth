import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";
import httpStatus from "http-status";
import config from "../../../config";
import { ILoginResponse } from "./auth.interface";

const login = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await AuthService.login(payload);
  console.log('login')

  const { refreshToken, ...others } = result;
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<ILoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User login successfull",
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<string>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User login successfull",
    data: result,
  });
});
const changePassword = catchAsync(async (req: Request, res: Response) => {
const {...passwordData} = req.body;
const user = req.user;
  await AuthService.changePassword(passwordData,user);

  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password changed successfully",
    data: [],
  });
});

export const AuthController = {
  login,
  refreshToken,
  changePassword
};
