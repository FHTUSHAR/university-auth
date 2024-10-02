import express from "express";
import { AcademicSemesterValidation } from "./academicSemester.validation";
import validateRequest from "../../middleware/validateRequest";
import { AcademicSemisterController } from "./academicSemester.controller";
const router = express.Router();
router.post(
  "/create-semester",
  validateRequest(AcademicSemesterValidation.academicSemesterZodSchema),
  AcademicSemisterController.createAcademicSemester
);

router.patch('/:id',validateRequest(AcademicSemesterValidation.updateSemesterZodSchema),AcademicSemisterController.updateSemester)

router.get("/:id",AcademicSemisterController.getSingleSemester)

router.get("/",AcademicSemisterController.getAllSemester)



export const AcademicSemesterRoute = router;
