import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { paginationField } from "../../../constants/pagination";
import { StudentService } from "./student.service";
import { IStudent } from "./student.interface";
import { studentFilterableFields } from "./student.constant";


const getAllStudents = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, studentFilterableFields);
    const paginationOptions = pick(req.query, paginationField);

    const result = await StudentService.getAllStudents(
      filters,
      paginationOptions
    );
    sendResponse<IStudent[]>(res, {
      statusCode: 200,
      success: true,
      message: "Student fetch successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleStudent = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await StudentService.getSingleStudent(id);
    sendResponse<IStudent | null>(res, {
      statusCode: 200,
      success: true,
      message: "Student fetch successfully",
      data: result,
    });
  }
);

const updateStudent = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData=req.body;
    const result = await StudentService.updateStudent(id,updateData);
    sendResponse<IStudent | null>(res, {
      statusCode: 200,
      success: true,
      message: "Student data updated successfully",
      data: result,
    });
  }
);

const deleteStudent = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await StudentService.deleteStudent(id);
    sendResponse<IStudent | null>(res, {
      statusCode: 200,
      success: true,
      message: "Student deleted successfully",
      data: result,
    });
  }
);

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent
};
