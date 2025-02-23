import { Model, Types } from "mongoose";

export type IFaculty = {
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
    academicDepartment?: Types.ObjectId;
    academicFaculty?: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export type FacultyModel = Model<IFaculty,Record<string, unknown>>