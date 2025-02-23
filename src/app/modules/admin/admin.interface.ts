import { Model, Types } from "mongoose";

export type IAdmin = {
    id: string;
    name: {
        firstName: string;
        middleName?: string;
        lastName: string;
    };
    dateOfBirth: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    gender: 'male' | 'female';
    permanentAddress: string;
    presentAddress: string;
    bloodGroup?: string;
    designation: string;
    profileImage?: string;
    managementDepartment?: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export type AdminModel = Model<IAdmin,Record<string, unknown>>