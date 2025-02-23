"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterRoute = void 0;
const express_1 = __importDefault(require("express"));
const academicSemester_validation_1 = require("./academicSemester.validation");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const academicSemester_controller_1 = require("./academicSemester.controller");
const router = express_1.default.Router();
router.post("/create-semester", (0, validateRequest_1.default)(academicSemester_validation_1.AcademicSemesterValidation.academicSemesterZodSchema), academicSemester_controller_1.AcademicSemisterController.createAcademicSemester);
router.patch('/:id', (0, validateRequest_1.default)(academicSemester_validation_1.AcademicSemesterValidation.updateSemesterZodSchema), academicSemester_controller_1.AcademicSemisterController.updateSemester);
router.get("/:id", academicSemester_controller_1.AcademicSemisterController.getSingleSemester);
router.delete("/:id", academicSemester_controller_1.AcademicSemisterController.deleteSemester);
router.get("/", academicSemester_controller_1.AcademicSemisterController.getAllSemester);
exports.AcademicSemesterRoute = router;
