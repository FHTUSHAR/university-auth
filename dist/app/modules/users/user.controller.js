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
exports.UserController = void 0;
const user_service_1 = __importDefault(require("./user.service"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const createStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { student } = _a, userData = __rest(_a, ["student"]);
    const result = yield user_service_1.default.createStudent(userData, student);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Student created successfully",
        data: result,
    });
}));
const createFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { faculty } = _a, userData = __rest(_a, ["faculty"]);
    const result = yield user_service_1.default.createFaculty(userData, faculty);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Faculty created successfully",
        data: result,
    });
}));
const createAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { admin } = _a, userData = __rest(_a, ["admin"]);
    const result = yield user_service_1.default.createAdmin(userData, admin);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Admin created successfully",
        data: result,
    });
}));
// const createUser = catchAsync(
//   async (req: Request, res: Response) => {
//     const { ...userData } = req.body;
//     const result = await userService.createUser(userData);
//     sendResponse(res, {
//       statusCode: 200,
//       success: true,
//       message: "User created successfully",
//       data: result,
//     });
//   }
// );
exports.UserController = { createStudent, createFaculty, createAdmin };
