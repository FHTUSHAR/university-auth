"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const academicDepartment_validation_1 = require("./academicDepartment.validation");
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const router = express_1.default.Router();
router.post("/create-department", (0, validateRequest_1.default)(academicDepartment_validation_1.AcademicDepartmentValidation.academicDepartmentZodSchema), academicDepartment_controller_1.AcademicFacultyController.createAcademicDepartment);
router.patch("/:id", (0, validateRequest_1.default)(academicDepartment_validation_1.AcademicDepartmentValidation.updateAcademicDepartmentZodSchema), academicDepartment_controller_1.AcademicFacultyController.updateDepartment);
router.get("/:id", academicDepartment_controller_1.AcademicFacultyController.getSingleDepartment);
router.delete("/:id", academicDepartment_controller_1.AcademicFacultyController.deleteDepartment);
router.get("/", academicDepartment_controller_1.AcademicFacultyController.getAllDepartment);
exports.AcademicDepartmentRoute = router;
