"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../error/ApiError"));
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const student_model_1 = require("../student/student.model");
const http_status_1 = require("http-status");
const faculty_model_1 = require("../faculty/faculty.model");
const admin_model_1 = require("../admin/admin.model");
const createStudent = (user, student) => __awaiter(void 0, void 0, void 0, function* () {
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
        user.password = config_1.default.default_student_password;
    }
    let newUserAllData = null;
    user.role = "student";
    const academicSemester = yield academicSemester_model_1.AcademicSemester.findById(student.academicSemester);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //generate student ID
        const id = yield (0, user_utils_1.generateStudentId)(academicSemester);
        user.id = id;
        student.id = id;
        const newFaculty = yield student_model_1.Student.create([student], { session });
        if (!newFaculty) {
            throw new ApiError_1.default(http_status_1.BAD_REQUEST, "Failed to create student");
        }
        //set _id to user
        user.student = newFaculty[0]._id;
        const newUser = yield user_model_1.User.create([user], { session });
        if (!newUser) {
            throw new ApiError_1.default(http_status_1.BAD_REQUEST, "Failed to create user");
        }
        newUserAllData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (newUserAllData) {
        newUserAllData = yield user_model_1.User.findOne({ id: newUserAllData.id }).populate({
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
    return newUserAllData;
});
const createFaculty = (user, faculty) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.password) {
        user.password = config_1.default.default_student_password;
    }
    let newUserAllData = null;
    user.role = "faculty";
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //generate student ID
        const id = yield (0, user_utils_1.generateFacultyId)();
        user.id = id;
        faculty.id = id;
        const newFaculty = yield faculty_model_1.Faculty.create([faculty], { session });
        if (!newFaculty) {
            throw new ApiError_1.default(http_status_1.BAD_REQUEST, "Failed to create student");
        }
        //set _id to user
        user.faculty = newFaculty[0]._id;
        const newUser = yield user_model_1.User.create([user], { session });
        if (!newUser) {
            throw new ApiError_1.default(http_status_1.BAD_REQUEST, "Failed to create user");
        }
        newUserAllData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (newUserAllData) {
        newUserAllData = yield user_model_1.User.findOne({ id: newUserAllData.id }).populate({
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
    return newUserAllData;
});
const createAdmin = (user, admin) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.password) {
        user.password = config_1.default.default_student_password;
    }
    let newUserAllData = null;
    user.role = "admin";
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //generate student ID
        const id = yield (0, user_utils_1.generateAdminId)();
        user.id = id;
        admin.id = id;
        const newAdmin = yield admin_model_1.Admin.create([admin], { session });
        if (!newAdmin) {
            throw new ApiError_1.default(http_status_1.BAD_REQUEST, "Failed to create admin");
        }
        //set _id to user
        user.admin = newAdmin[0]._id;
        const newUser = yield user_model_1.User.create([user], { session });
        if (!newUser) {
            throw new ApiError_1.default(http_status_1.BAD_REQUEST, "Failed to create user");
        }
        newUserAllData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (newUserAllData) {
        newUserAllData = yield user_model_1.User.findOne({ id: newUserAllData.id }).populate({
            path: "admin",
            populate: [
                {
                    path: "managementDepartment",
                },
            ],
        });
    }
    return newUserAllData;
});
exports.default = { createStudent, createFaculty, createAdmin };
