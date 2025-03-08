import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AcademicFacultyService } from "./academicFaculty.service";
import pick from "../../../shared/pick";
import { filterableFields } from "./academicFaculty.constant";
import { paginationField } from "../../../constants/pagination";

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicFacultyData } = req.body;
    const result = await AcademicFacultyService.createFaculty(
      academicFacultyData
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Academic faculty created successfully",
      data: result,
    });
  }
);

const updateFaculty=catchAsync(async(req:Request,res:Response) => {
const {id}=req.params
const payload=req.body
const result = await AcademicFacultyService.updateFaculty(id,payload)
sendResponse(res, {
  statusCode: 200,
  success: true,
  message: "Academic faculty updated successfully",
  data: result,
});
})

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, filterableFields);

  console.log(req.user)
  const paginationOptions = pick(req.query, paginationField);
  const result = await AcademicFacultyService.getAllFaculty(
    filters,
    paginationOptions
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic faculty fetch successfully",
    data: result,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicFacultyService.getSingleFaculty(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic faculty fetch successfully",
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicFacultyService.deleteFaculty(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic faculty deleted successfully",
    data: result,
  });
});
export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllFaculty,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty
};
