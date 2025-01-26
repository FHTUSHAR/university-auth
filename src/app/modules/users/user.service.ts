import mongoose from "mongoose";
import config from "../../../config";
import ApiError from "../../../error/ApiError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { IStudent } from "../student/student.interface";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { generateAdminId, generateFacultyId, generateStudentId } from "./user.utils";
import { Student } from "../student/student.model";
import { BAD_REQUEST } from "http-status";
import { IFaculty } from "../faculty/faculty.interface";
import { Faculty } from "../faculty/faculty.model";
import { IAdmin } from "../admin/admin.interface";
import { Admin } from "../admin/admin.model";

const createStudent = async (user: IUser, student: IStudent) => {
  // console.log(user)
  // let userId;
  // if(user.role==='faculty'){
  //  userId=await generateFacultyId()
  // }
  // else{
  //   userId=await generateStudentId(semester)
  // }
  // user.id=userId;
  //auto generated incremental id
  //default password
  if (!user.password) {
    user.password = config.default_student_password as string;
  }
  let newUserAllData = null;
  user.role = "student";
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //generate student ID
    const id = await generateStudentId(academicSemester);
    user.id = id;
    student.id = id;
    const newFaculty = await Student.create([student], { session });
    if (!newFaculty) {
      throw new ApiError(BAD_REQUEST, "Failed to create student");
    }

    //set _id to user
    user.student = newFaculty[0]._id;
    const newUser = await User.create([user], { session });

    if (!newUser) {
      throw new ApiError(BAD_REQUEST, "Failed to create user");
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: "student",
      populate: [
        {
          path: "academicSemester",
        },
        {
          path: "academicDepartment",
        },
        {
          path: "academicFaculty",
        },
      ],
    });
  }
  return newUserAllData
};
const createFaculty = async (user: IUser, faculty: IFaculty) => {
  if (!user.password) {
    user.password = config.default_student_password as string;
  }
  let newUserAllData = null;
  user.role = "faculty";
 
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //generate student ID
    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;
    const newFaculty = await Faculty.create([faculty], { session });
    if (!newFaculty) {
      throw new ApiError(BAD_REQUEST, "Failed to create student");
    }

    //set _id to user
    user.faculty = newFaculty[0]._id;
    const newUser = await User.create([user], { session });

    if (!newUser) {
      throw new ApiError(BAD_REQUEST, "Failed to create user");
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: "faculty",
      populate: [
        {
          path: "academicDepartment",
        },
        {
          path: "academicFaculty",
        },
      ],
    });
  }
  return newUserAllData
};

const createAdmin = async (user: IUser, admin: IAdmin) => {
  if (!user.password) {
    user.password = config.default_student_password as string;
  }
  let newUserAllData = null;
  user.role = "admin";
 
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //generate student ID
    const id = await generateAdminId();
    user.id = id;
    admin.id = id;
    const newAdmin = await Admin.create([admin], { session });
    if (!newAdmin) {
      throw new ApiError(BAD_REQUEST, "Failed to create admin");
    }

    //set _id to user
    user.admin = newAdmin[0]._id;
    const newUser = await User.create([user], { session });

    if (!newUser) {
      throw new ApiError(BAD_REQUEST, "Failed to create user");
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: "admin",
      populate: [
        {
          path: "managementDepartment",
        },
      ],
    });
  }
  return newUserAllData
};
export default { createStudent, createFaculty, createAdmin };
