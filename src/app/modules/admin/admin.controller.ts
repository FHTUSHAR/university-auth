import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { paginationField } from "../../../constants/pagination";
import { adminFilterableFields } from "./admin.constant";
import { IAdmin } from "./admin.interface";
import { AdminService } from "./admin.service";



const getAllAdmins = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, adminFilterableFields);
    const paginationOptions = pick(req.query, paginationField);

    const result = await AdminService.getAllAdmins(
      filters,
      paginationOptions
    );
    sendResponse<IAdmin[]>(res, {
      statusCode: 200,
      success: true,
      message: "Admin fetch successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleAdmin = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AdminService.getSingleAdmin(id);
    sendResponse<IAdmin | null>(res, {
      statusCode: 200,
      success: true,
      message: "Admin fetch successfully",
      data: result,
    });
  }
);

const updateAdmin = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData=req.body;
    const result = await AdminService.updateAdmin(id,updateData);
    sendResponse<IAdmin | null>(res, {
      statusCode: 200,
      success: true,
      message: "Admin data updated successfully",
      data: result,
    });
  }
);

const deleteAdmin = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AdminService.deleteAdmin(id);
    sendResponse<IAdmin | null>(res, {
      statusCode: 200,
      success: true,
      message: "Admin deleted successfully",
    //   data: result,
    });
  }
);

export const AdminController = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin
};
