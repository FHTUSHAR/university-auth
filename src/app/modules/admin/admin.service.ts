import mongoose, { SortOrder } from "mongoose";
import ApiError from "../../../error/ApiError";
import httpStatus, { BAD_REQUEST } from "http-status";
import {
  IGenericResponse,
  IPaginationOptions,
} from "../../../interfaces/common";
import { PaginationHelper } from "../../../helpers/paginationHelper";
import { User } from "../users/user.model";
import { adminSearchAbleFields } from "./admin.constant";
import { Admin } from "./admin.model";
import { IAdmin } from "./admin.interface";

const getAllAdmins = async (
  filters: any,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<any>> => {
  const { searchTerm, ...filterData } = filters;

  const andConditions: any = [];
  if (searchTerm) {
    andConditions.push({
      $or: adminSearchAbleFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelper.calculatePagination(paginationOptions);
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  let filter;
  if (andConditions.length !== 0) {
    filter = { $and: andConditions };
  } else {
    filter = {};
  }

  const result = await Admin.find(filter)
    .populate("managementDepartment")
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Admin.countDocuments(filter);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findById(id).populate("managementDepartment");
  return result;
};

const updateAdmin = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const isExit = await Admin.findOne({ id });
  if (!isExit) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin not exit");
  }
  const { name, ...adminData } = payload;
  const updatedAdminData = { ...adminData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}`;
      (updatedAdminData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  const filter = { id };
  const options = { new: true };
  const result = await Admin.findOneAndUpdate(
    filter,
    updatedAdminData,
    options
  );
  return result;
};

const deleteAdmin = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedAdmin = await Admin.deleteOne({ id });
    if (!deletedAdmin) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to delete admin");
    }
    const deletedUser = await User.deleteOne({ id });
    if (!deletedUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to delete admin");
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedAdmin;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};
export const AdminService = {
  getAllAdmins,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
};
