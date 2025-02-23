import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { paginationField } from "../../../constants/pagination";
import { IManagementDepartment } from "./managementDepartment.interface";
import { ManagementDepartmentService } from "./managementDepartment.service";
import { filterableFields } from "./managementDepartment.constant";



const createManagementDepartment = catchAsync(
    async (req: Request, res: Response) => {
        const {...payload} = req.body;
      const result = await ManagementDepartmentService.createManagementDepartment(payload);
      sendResponse<IManagementDepartment | null>(res, {
        statusCode: 200,
        success: true,
        message: "ManagementDepartments created successfully",
        data: result,
      });
    }
  );

const getAllManagementDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, filterableFields);
    const paginationOptions = pick(req.query, paginationField);

    const result = await ManagementDepartmentService.getAllManagementDepartments(
      filters,
      paginationOptions
    );
    sendResponse<IManagementDepartment[]>(res, {
      statusCode: 200,
      success: true,
      message: "ManagementDepartments fetch successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ManagementDepartmentService.getSingleManagementDepartment(id);
    sendResponse<IManagementDepartment | null>(res, {
      statusCode: 200,
      success: true,
      message: "ManagementDepartments fetch successfully",
      data: result,
    });
  }
);

const updateManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData=req.body;
    const result = await ManagementDepartmentService.updateManagementDepartment(id,updateData);
    sendResponse<IManagementDepartment | null>(res, {
      statusCode: 200,
      success: true,
      message: "ManagementDepartments data updated successfully",
      data: result,
    });
  }
);

// const deleteFaculty = catchAsync(
//   async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const result = await FacultyService.deleteFaculty(id);
//     sendResponse<IManagementDepartment | null>(res, {
//       statusCode: 200,
//       success: true,
//       message: "Faculty deleted successfully",
//       data: result,
//     });
//   }
// );

export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartments,
  getSingleManagementDepartment,
  updateManagementDepartment,
};
