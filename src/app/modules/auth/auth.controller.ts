import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";
import httpStatus from "http-status";
import config from "../../../config";
import { ILoginResponse } from "./auth.interface";


const login=catchAsync(async(req:Request,res:Response) => {
const payload=req.body
const result = await AuthService.login(payload)

const {refreshToken,...others} = result
const cookieOptions = {
  secure:config.env==='production',
  httpOnly:true
}

res.cookie('refreshToken',refreshToken,cookieOptions)

sendResponse<ILoginResponse>(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: "User login successfull",
  data: others,
});
})


export const AuthController = {
    login
};
