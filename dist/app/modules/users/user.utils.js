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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAdminId = exports.generateFacultyId = exports.generateStudentId = exports.findLastAdminId = exports.findLastFacultyId = exports.findLastStudentId = void 0;
const faculty_model_1 = require("../faculty/faculty.model");
const admin_model_1 = require("../admin/admin.model");
const user_model_1 = require("./user.model");
// let lastUserId=0;
const findLastStudentId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastUser = yield user_model_1.User.findOne({}, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return lastUser === null || lastUser === void 0 ? void 0 : lastUser.id.substring(4);
});
exports.findLastStudentId = findLastStudentId;
const findLastFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastUser = yield faculty_model_1.Faculty.findOne({}, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return lastUser === null || lastUser === void 0 ? void 0 : lastUser.id.substring(2);
});
exports.findLastFacultyId = findLastFacultyId;
const findLastAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastUser = yield admin_model_1.Admin.findOne({}, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return lastUser === null || lastUser === void 0 ? void 0 : lastUser.id.substring(2);
});
exports.findLastAdminId = findLastAdminId;
const generateStudentId = (academicSemester) => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = (yield (0, exports.findLastStudentId)()) || String(0).padStart(5, "0");
    let incrementId = (parseInt(currentId) + 1).toString().padStart(5, "0");
    incrementId = `${academicSemester === null || academicSemester === void 0 ? void 0 : academicSemester.year.substring(2)}${academicSemester === null || academicSemester === void 0 ? void 0 : academicSemester.code}${incrementId}`;
    return incrementId;
});
exports.generateStudentId = generateStudentId;
const generateFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = (yield (0, exports.findLastFacultyId)()) || String(0).padStart(5, "0");
    let incrementId = (parseInt(currentId) + 1).toString().padStart(5, "0");
    incrementId = `F-${incrementId}`;
    return incrementId;
});
exports.generateFacultyId = generateFacultyId;
const generateAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = (yield (0, exports.findLastAdminId)()) || String(0).padStart(5, "0");
    let incrementId = (parseInt(currentId) + 1).toString().padStart(5, "0");
    incrementId = `A-${incrementId}`;
    return incrementId;
});
exports.generateAdminId = generateAdminId;
