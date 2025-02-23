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
exports.FacultyService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../../error/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const faculty_constant_1 = require("./faculty.constant");
const faculty_model_1 = require("./faculty.model");
const user_model_1 = require("../users/user.model");
const getAllFaculties = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: faculty_constant_1.facultySearchAbleFields.map((field) => ({
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
    const result = yield faculty_model_1.Faculty.find(filter)
        .populate("academicDepartment")
        .populate("academicFaculty")
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield faculty_model_1.Faculty.countDocuments(filter);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleFaculty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_model_1.Faculty.findById(id)
        .populate("academicDepartment")
        .populate("academicFaculty");
    return result;
});
const updateFaculty = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExit = yield faculty_model_1.Faculty.findOne({ id });
    if (!isExit) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Faculty not exit");
    }
    const { name } = payload, facultyData = __rest(payload, ["name"]);
    const updatedFacultyData = Object.assign({}, facultyData);
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach((key) => {
            const nameKey = `name.${key}`;
            updatedFacultyData[nameKey] = name[key];
        });
    }
    const filter = { id };
    const options = { new: true };
    const result = yield faculty_model_1.Faculty.findOneAndUpdate(filter, updatedFacultyData, options);
    return result;
});
const deleteFaculty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deletedFaculty = yield faculty_model_1.Faculty.deleteOne({ id });
        if (!deletedFaculty) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to delete faculty");
        }
        const deletedUser = yield user_model_1.User.deleteOne({ id });
        if (!deletedUser) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to delete faculty");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return deletedFaculty;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
});
exports.FacultyService = {
    getAllFaculties,
    getSingleFaculty,
    deleteFaculty,
    updateFaculty,
};
