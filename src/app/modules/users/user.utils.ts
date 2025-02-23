import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import { Faculty } from "../faculty/faculty.model";
import { Admin } from "../admin/admin.model";
import { User } from "./user.model";

// let lastUserId=0;
export const findLastStudentId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastUser?.id.substring(4);
};

export const findLastFacultyId = async () => {
  const lastUser = await Faculty.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastUser?.id.substring(2);
};
export const findLastAdminId = async () => {
  const lastUser = await Admin.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastUser?.id.substring(2);
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
):Promise<string> => {
  let currentId = (await findLastStudentId()) || String(0).padStart(5, "0");
  let incrementId = (parseInt(currentId) + 1).toString().padStart(5, "0");
  incrementId = `${academicSemester?.year.substring(2)}${
    academicSemester?.code
  }${incrementId}`;
  return incrementId;
};

export const generateFacultyId = async () => {
  let currentId = (await findLastFacultyId()) || String(0).padStart(5, "0");
  let incrementId = (parseInt(currentId) + 1).toString().padStart(5, "0");
  incrementId = `F-${incrementId}`;
  return incrementId;
};
export const generateAdminId = async () => {
  let currentId = (await findLastAdminId()) || String(0).padStart(5, "0");
  let incrementId = (parseInt(currentId) + 1).toString().padStart(5, "0");
  incrementId = `A-${incrementId}`;
  return incrementId;
};
