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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const ApiError_1 = __importDefault(require("../../../error/ApiError"));
const student_model_1 = require("../student/student.model");
const http_status_1 = __importDefault(require("http-status"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const student_constant_1 = require("./student.constant");
const getAllStudents = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: student_constant_1.studentSearchAbleFields.map((field) => ({
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
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.PaginationHelper.calculatePagination(paginationOptions);
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    let filter;
    if (andConditions.length !== 0) {
        filter = { $and: andConditions };
    }
    else {
        filter = {};
    }
    const result = yield student_model_1.Student.find(filter)
        .populate('academicSemester')
        .populate('academicDepartment')
        .populate('academicFaculty')
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield student_model_1.Student.countDocuments(filter);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.findById(id)
        .populate('academicSemester')
        .populate('academicDepartment')
        .populate('academicFaculty');
    return result;
});
const updateStudent = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExit = yield student_model_1.Student.findOne({ id });
    if (!isExit) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Student not exit');
    }
    const { name, localGurdian, guardian } = payload, studentData = __rest(payload, ["name", "localGurdian", "guardian"]);
    const updatedStudentData = Object.assign({}, studentData);
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach((key) => {
            const nameKey = `name.${key}`;
            updatedStudentData[nameKey] = name[key];
        });
    }
    if (guardian && Object.keys(guardian).length > 0) {
        Object.keys(guardian).forEach((key) => {
            const nameKey = `guardian.${key}`;
            updatedStudentData[nameKey] = guardian[key];
        });
    }
    if (localGurdian && Object.keys(localGurdian).length > 0) {
        Object.keys(localGurdian).forEach((key) => {
            const nameKey = `localGurdian.${key}`;
            updatedStudentData[nameKey] = localGurdian[key]; //localGurdian.contactNo=45455555
        });
    }
    const filter = { id };
    const options = { new: true };
    const result = yield student_model_1.Student.findOneAndUpdate(filter, updatedStudentData, options);
    return result;
});
const deleteStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.findByIdAndDelete(id);
    return result;
});
exports.StudentService = { getAllStudents, getSingleStudent, deleteStudent, updateStudent };
