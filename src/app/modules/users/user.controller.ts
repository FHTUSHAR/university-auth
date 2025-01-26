import { NextFunction, Request, RequestHandler, Response } from "express";
import userService from "./user.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";

const createStudent = catchAsync(
  async (req: Request, res: Response) => {
    const { student,...userData } = req.body;
    const result = await userService.createStudent(userData,student);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Student created successfully",
      data: result,
    });
  }
);

const createFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { faculty,...userData } = req.body;
    const result = await userService.createFaculty(userData,faculty);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Faculty created successfully",
      data: result,
    });
  }
);

const createAdmin = catchAsync(
  async (req: Request, res: Response) => {
    const { admin,...userData } = req.body;
    const result = await userService.createAdmin(userData,admin);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin created successfully",
      data: result,
    });
  }
);
// const createUser = catchAsync(
//   async (req: Request, res: Response) => {
//     const { ...userData } = req.body;
//     const result = await userService.createUser(userData);

//     sendResponse(res, {
//       statusCode: 200,
//       success: true,
//       message: "User created successfully",
//       data: result,
//     });
//   }
// );

export const UserController = { createStudent, createFaculty, createAdmin };
