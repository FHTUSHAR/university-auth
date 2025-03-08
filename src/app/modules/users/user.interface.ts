import { Model, Types } from "mongoose";
import { IStudent } from "../student/student.interface";
import { IFaculty } from "../faculty/faculty.interface";
import { IAdmin } from "../admin/admin.interface";

export interface IUser {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
  needsPasswordChange?: boolean;
  passwordChangedAt?:Date;
}
//-------------for method--------------
// export interface IUserMethods {
//   isUserExist(id: string): Promise<Partial<IUser> | null>;
//   isPasswordExist(
//     givenPassword: string,
//     savedPassword: string
//   ): Promise<boolean>;
// }

// export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
// for ------------static-------------
export interface UserModel extends Model<IUser> {
  isUserExist(id: string): Promise<Partial<IUser> | null>;
  isPasswordExist(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
}

