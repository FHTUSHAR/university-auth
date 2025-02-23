import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { AcademicFacultyValidation } from "./academicFaculty.validation";
import { AcademicFacultyController } from "./academicFaculty.controller";
const router = express.Router();
router.post(
  "/create-faculty",
  validateRequest(AcademicFacultyValidation.academicFacultyZodSchema),
  AcademicFacultyController.createAcademicFaculty

);

router.patch('/:id',AcademicFacultyController.updateFaculty)
router.get("/:id",AcademicFacultyController.getSingleFaculty)
router.delete("/:id",AcademicFacultyController.deleteFaculty)
router.get("/",AcademicFacultyController.getAllFaculty)



export const AcademicFacultyRoute = router;
