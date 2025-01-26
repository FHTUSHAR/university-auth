import { SortOrder } from "mongoose";
import ApiError from "../../../error/ApiError"
import { PaginationHelper } from "../../../helpers/paginationHelper";
import { IGenericResponse, IPaginationOptions } from "../../../interfaces/common";
import { searchAbleFields } from "./managementDepartment.constant";
import { IManagementDepartment, IManagementDepartmentFilters } from "./managementDepartment.interface"
import { ManagementDepartment } from "./managementDepartment.model"

const createManagementDepartment = async(payload:IManagementDepartment):Promise<IManagementDepartment> => {
    const result = await ManagementDepartment.create(payload);
    return result;
}
const getAllManagementDepartments = async (
  filters: IManagementDepartmentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IManagementDepartment[]>> => {
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
  const result = await ManagementDepartment.find(filter)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await ManagementDepartment.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleManagementDepartment = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findById(id);
  return result;
};

const updateManagementDepartment = async (
    id: string,
    payload:Partial<IManagementDepartment>
  ): Promise<IManagementDepartment | null> => {
    
    const filter = { _id: id };
    const options={new:true}
    const result = await ManagementDepartment.findOneAndUpdate(filter,payload,options);
    return result;
  };

export const ManagementDepartmentService = {
    createManagementDepartment,
    getAllManagementDepartments,
    getSingleManagementDepartment,
    updateManagementDepartment
}