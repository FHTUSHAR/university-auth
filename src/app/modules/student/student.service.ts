import mongoose, { SortOrder } from "mongoose";
import config from "../../../config";
import ApiError from "../../../error/ApiError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import httpStatus, { BAD_REQUEST } from "http-status";
import { IGenericResponse, IPaginationOptions } from "../../../interfaces/common";
import { PaginationHelper } from "../../../helpers/paginationHelper";
import { studentSearchAbleFields } from "./student.constant";

const getAllStudents = async (
  filters: any,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<any>> => {
  const { searchTerm, ...filterData } = filters;

  const andConditions: any = [];
  if (searchTerm) {
    andConditions.push({
      $or: studentSearchAbleFields.map((field) => ({
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

  const result = await Student.find(filter)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Student.countDocuments(filter);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleStudent = async (
  id: string
): Promise<IStudent | null> => {
  const result = await Student.findById(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

const updateStudent = async (
  id: string,
  payload:Partial<IStudent>
):Promise<IStudent | null> => {
  const isExit = await Student.findOne({id});
  if(!isExit){
    throw new ApiError(httpStatus.NOT_FOUND,'Student not exit')
  }
  const {name,localGurdian,guardian,...studentData} = payload;
  const updatedStudentData = {...studentData}

  if(name && Object.keys(name).length> 0 ){
    Object.keys(name).forEach((key) => {
        const nameKey = `name.${key}`;
        (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
      })
  }

  if(guardian && Object.keys(guardian).length> 0 ){
    Object.keys(guardian).forEach((key) => {
        const nameKey = `guardian.${key}`;
        (updatedStudentData as any)[nameKey] = guardian[key as keyof typeof guardian];
      })
  }

  if(localGurdian && Object.keys(localGurdian).length> 0 ){
    Object.keys(localGurdian).forEach((key) => {
        const nameKey = `localGurdian.${key}`;
        (updatedStudentData as any)[nameKey] = localGurdian[key as keyof typeof localGurdian];//localGurdian.contactNo=45455555
      })
  }

  const filter = {id };
  const options={new:true}
  const result = await Student.findOneAndUpdate(filter,updatedStudentData,options);
  return result;
};

const deleteStudent = async (
    id: string,
  ) => {
    const result = await Student.findByIdAndDelete(id);
    return result;
  };
export const StudentService = { getAllStudents, getSingleStudent, deleteStudent, updateStudent };
