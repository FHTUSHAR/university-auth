import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AcademicDepartmentService } from "./academicDepartment.service";
import pick from "../../../shared/pick";
import { filterableFields } from "./academicDepartment.constant";
import { paginationField } from "../../../constants/pagination";

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicDepartmentData } = req.body;
    const result = await AcademicDepartmentService.createDepartment(
      academicDepartmentData
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Academic Department created successfully",
      data: result,
    });
  }
);

const updateDepartment=catchAsync(async(req:Request,res:Response) => {
const {id}=req.params
const payload=req.body
const result = await AcademicDepartmentService.updateDepartment(id,payload)
sendResponse(res, {
  statusCode: 200,
  success: true,
  message: "Academic Department updated successfully",
  data: result,
});
})

const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, filterableFields);
  const paginationOptions = pick(req.query, paginationField);
  const result = await AcademicDepartmentService.getAllDepartment(
    filters,
    paginationOptions
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic Department fetch successfully",
    data: result,
  });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicDepartmentService.getSingleDepartment(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic Department fetch successfully",
    data: result,
  });
});

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicDepartmentService.deleteDepartment(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic Department deleted successfully",
    data: result,
  });
});
export const AcademicFacultyController = {
  createAcademicDepartment,
  getAllDepartment,
  getSingleDepartment,
  deleteDepartment,
  updateDepartment
};
