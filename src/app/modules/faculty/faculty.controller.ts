import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { paginationField } from "../../../constants/pagination";
import { facultyFilterableFields } from "./faculty.constant";
import { IFaculty } from "./faculty.interface";
import { FacultyService } from "./faculty.service";

const getAllFaculties = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, facultyFilterableFields);
    const paginationOptions = pick(req.query, paginationField);

    const result = await FacultyService.getAllFaculties(
      filters,
      paginationOptions
    );
    sendResponse<IFaculty[]>(res, {
      statusCode: 200,
      success: true,
      message: "Faculty fetch successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await FacultyService.getSingleFaculty(id);
    sendResponse<IFaculty | null>(res, {
      statusCode: 200,
      success: true,
      message: "Faculty fetch successfully",
      data: result,
    });
  }
);

const updateFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData=req.body;
    const result = await FacultyService.updateFaculty(id,updateData);
    sendResponse<IFaculty | null>(res, {
      statusCode: 200,
      success: true,
      message: "Faculty data updated successfully",
      data: result,
    });
  }
);

const deleteFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await FacultyService.deleteFaculty(id);
    sendResponse<IFaculty | null>(res, {
      statusCode: 200,
      success: true,
      message: "Faculty deleted successfully",
      // data: result,
    });
  }
);

export const FacultyController = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty
};
