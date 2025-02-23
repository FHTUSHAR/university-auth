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
exports.AdminService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../../error/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const user_model_1 = require("../users/user.model");
const admin_constant_1 = require("./admin.constant");
const admin_model_1 = require("./admin.model");
const getAllAdmins = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: admin_constant_1.adminSearchAbleFields.map((field) => ({
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
    const result = yield admin_model_1.Admin.find(filter)
        .populate("managementDepartment")
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield admin_model_1.Admin.countDocuments(filter);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.Admin.findById(id).populate("managementDepartment");
    return result;
});
const updateAdmin = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExit = yield admin_model_1.Admin.findOne({ id });
    if (!isExit) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Admin not exit");
    }
    const { name } = payload, adminData = __rest(payload, ["name"]);
    const updatedAdminData = Object.assign({}, adminData);
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach((key) => {
            const nameKey = `name.${key}`;
            updatedAdminData[nameKey] = name[key];
        });
    }
    const filter = { id };
    const options = { new: true };
    const result = yield admin_model_1.Admin.findOneAndUpdate(filter, updatedAdminData, options);
    return result;
});
const deleteAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deletedAdmin = yield admin_model_1.Admin.deleteOne({ id });
        if (!deletedAdmin) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to delete admin");
        }
        const deletedUser = yield user_model_1.User.deleteOne({ id });
        if (!deletedUser) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to delete admin");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return deletedAdmin;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
});
exports.AdminService = {
    getAllAdmins,
    getSingleAdmin,
    deleteAdmin,
    updateAdmin,
};
