import { NextFunction, Request, Response } from "express";
import { AcademicSemesterService } from "./academicSemester.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IPaginationOptions } from "../../../interfaces/common";
import pick from "../../../shared/pick";
import { paginationField } from "../../../constants/pagination";
import { IAcademicSemester } from "./academicSemester.interface";
import { filterableFields } from "./academicSemester.constant";

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Academic Semester created successfully",
      data: result,
    });
    next();
  }
);

const getAllSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const paginationOptions = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortBy: req.query.sortBy,
    //   sortOrder:req.query.sortOrder,
    // };
    const filters = pick(req.query, filterableFields);
    const paginationOptions = pick(req.query, paginationField);

    const result = await AcademicSemesterService.getAllSemester(
      filters,
      paginationOptions
    );
    sendResponse<IAcademicSemester[]>(res, {
      statusCode: 200,
      success: true,
      message: "Academic Semester fetch successfully",
      meta: result.meta,
      data: result.data,
    });
    next();
  }
);

const getSingleSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await AcademicSemesterService.getSingleSemester(id);
    sendResponse<IAcademicSemester | null>(res, {
      statusCode: 200,
      success: true,
      message: "Academic Semester fetch successfully",
      data: result,
    });
    next();
  }
);

const updateSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updateData=req.body;
    const result = await AcademicSemesterService.updateSemester(id,updateData);
    sendResponse<IAcademicSemester | null>(res, {
      statusCode: 200,
      success: true,
      message: "Academic Semester fetch successfully",
      data: result,
    });
    next();
  }
);

export const AcademicSemisterController = {
  createAcademicSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester
};
