import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { AcademicDepartmentValidation } from "./academicDepartment.validation";
import { AcademicFacultyController } from "./academicDepartment.controller";
const router = express.Router();
router.post(
  "/create-department",
  validateRequest(AcademicDepartmentValidation.academicDepartmentZodSchema),
  AcademicFacultyController.createAcademicDepartment
);

router.patch(
  "/:id",
  validateRequest(AcademicDepartmentValidation.updateAcademicDepartmentZodSchema),
  AcademicFacultyController.updateDepartment
);
router.get("/:id", AcademicFacultyController.getSingleDepartment);
router.delete("/:id", AcademicFacultyController.deleteDepartment);
router.get("/", AcademicFacultyController.getAllDepartment);

export const AcademicDepartmentRoute = router;
