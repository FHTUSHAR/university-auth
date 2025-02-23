import { SortOrder } from "mongoose";
import { PaginationHelper } from "../../../helpers/paginationHelper";
import {
  IGenericResponse,
  IPaginationOptions,
} from "../../../interfaces/common";
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  const result = (await AcademicDepartment.create(payload)).populate('academicFaculty');
  return result;
};

const updateDepartment = async (
  id: string,
  payload: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
  const filters = { _id: id };
  const options = { new: true };
  const result = await AcademicDepartment.findByIdAndUpdate(
    filters,
    payload,
    options
  ).populate('academicFaculty');
  return result;
};

const getAllDepartment = async (
  filters: IAcademicDepartmentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const { searchTerm, ...filterData } = filters;
  let andConditions: any = [];
  if (searchTerm) {
    andConditions.push({
      title: {
        $regex: searchTerm,
        $options: "i",
      },
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
  const result = await AcademicDepartment.find(filter)
    .populate('academicFaculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await AcademicDepartment.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(id).populate('academicFaculty');
  return result;
};

const deleteDepartment = async (id: string) => {
  const result = await AcademicDepartment.findByIdAndDelete(id);
  return result;
};

export const AcademicDepartmentService = {
  createDepartment,
  getAllDepartment,
  deleteDepartment,
  getSingleDepartment,
  updateDepartment
};
