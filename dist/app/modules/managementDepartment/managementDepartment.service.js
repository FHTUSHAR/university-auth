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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagementDepartmentService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const managementDepartment_constant_1 = require("./managementDepartment.constant");
const managementDepartment_model_1 = require("./managementDepartment.model");
const createManagementDepartment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield managementDepartment_model_1.ManagementDepartment.create(payload);
    return result;
});
const getAllManagementDepartments = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: managementDepartment_constant_1.searchAbleFields.map((field) => ({
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
    const result = yield managementDepartment_model_1.ManagementDepartment.find(filter)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield managementDepartment_model_1.ManagementDepartment.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleManagementDepartment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield managementDepartment_model_1.ManagementDepartment.findById(id);
    return result;
});
const updateManagementDepartment = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { _id: id };
    const options = { new: true };
    const result = yield managementDepartment_model_1.ManagementDepartment.findOneAndUpdate(filter, payload, options);
    return result;
});
exports.ManagementDepartmentService = {
    createManagementDepartment,
    getAllManagementDepartments,
    getSingleManagementDepartment,
    updateManagementDepartment
};
