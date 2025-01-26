import mongoose, { SortOrder } from "mongoose";
import ApiError from "../../../error/ApiError";
import httpStatus, { BAD_REQUEST } from "http-status";
import {
  IGenericResponse,
  IPaginationOptions,
} from "../../../interfaces/common";
import { PaginationHelper } from "../../../helpers/paginationHelper";
import { facultySearchAbleFields } from "./faculty.constant";
import { Faculty } from "./faculty.model";
import { IFaculty } from "./faculty.interface";
import { User } from "../users/user.model";

const getAllFaculties = async (
  filters: any,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<any>> => {
  const { searchTerm, ...filterData } = filters;

  const andConditions: any = [];
  if (searchTerm) {
    andConditions.push({
      $or: facultySearchAbleFields.map((field) => ({
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

  const result = await Faculty.find(filter)
    .populate("academicDepartment")
    .populate("academicFaculty")
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Faculty.countDocuments(filter);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findById(id)
    .populate("academicDepartment")
    .populate("academicFaculty");
  return result;
};

const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const isExit = await Faculty.findOne({ id });
  if (!isExit) {
    throw new ApiError(httpStatus.NOT_FOUND, "Faculty not exit");
  }
  const { name, ...facultyData } = payload;
  const updatedFacultyData = { ...facultyData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}`;
      (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  const filter = { id };
  const options = { new: true };
  const result = await Faculty.findOneAndUpdate(
    filter,
    updatedFacultyData,
    options
  );
  return result;
};

const deleteFaculty = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedFaculty = await Faculty.deleteOne({id});
    if (!deletedFaculty) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to delete faculty");
    }
    const deletedUser = await User.deleteOne({ id });
    if (!deletedUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to delete faculty");
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedFaculty;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};
export const FacultyService = {
  getAllFaculties,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
};
