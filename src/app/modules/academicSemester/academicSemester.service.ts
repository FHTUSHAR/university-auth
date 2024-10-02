import ApiError from "../../../error/ApiError";
import {
  IGenericResponse,
  IPaginationOptions,
} from "../../../interfaces/common";
import {
  academicSemesterTitleCodeMapper,
  searchAbleFields,
} from "./academicSemester.constant";
import { AcademicSemester } from "./academicSemester.model";
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from "./academicSemester.interface";
import status from "http-status";
import { PaginationHelper } from "../../../helpers/paginationHelper";
import { SortOrder } from "mongoose";

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(status.BAD_REQUEST, "Invalid Semester Code!");
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemester = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { searchTerm, ...filterData } = filters;

  const andConditions: any = [];
  if (searchTerm) {
    andConditions.push({
      $or: searchAbleFields.map((field) => ({
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
  // const andConditions=[{
  //   $or:[
  //     {
  //       code:{
  //         $regex:searchTerm,
  //         $options:'i'
  //       }
  //     },
  //     {
  //       title:{
  //         $regex:searchTerm,
  //         $options:'i'
  //       }
  //     },
  //     {
  //       year:{
  //         $regex:searchTerm,
  //         $options:'i'
  //       }
  //     }
  //   ]
  // }]
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
  const result = await AcademicSemester.find(filter)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateSemester = async (
  id: string,
  payload:Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (payload.title && payload.code && academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(status.BAD_REQUEST, "Invalid Semester Code!");
  }
  const filter = { _id: id };
  const options={new:true}
  const result = await AcademicSemester.findOneAndUpdate(filter,payload,options);
  return result;
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester
};
