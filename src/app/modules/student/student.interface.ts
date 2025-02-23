import {   Model } from 'mongoose';
type IUserName = {
    firstName:String,
    middleName?:String,
    lastName:String,
};

type IGuardian =  {
    fatherName:String;
    fatherOccupation:String;
    fatherContactNumber:String;
    motherName:String;
    motherOccupation:String;
    motherContactNumber:String;
    address:String;
};

type ILocalGuardian =  {
    name:String;
    occupation:String;
    contactNumber:String;
    address:String;
}

export type IStudent = {
    id:String;
    name: IUserName;
    gender:String;
    dateOfBirth:String;
    guardian:IGuardian;
    localGurdian:ILocalGuardian;
    contactNo:String;
    emergencyContactNo:String;
    email:String;
    presentAddress:String;
    permanentAddress:String;
    bloodGroup?:String;
    academicSemester:String;
    academicDepartment:String;
    academicFaculty:String;
    profileImage?:String;

}
export type StudentModel = Model<IStudent, Record<string, unknown>>;
