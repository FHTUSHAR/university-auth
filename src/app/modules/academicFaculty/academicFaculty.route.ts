import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { AcademicFacultyValidation } from "./academicFaculty.validation";
import { AcademicFacultyController } from "./academicFaculty.controller";
import auth from "../../middleware/auth";
import { ENUM_USER_ROLL } from "../../../enum/users";
const router = express.Router();
router.post(
  "/create-faculty",
  validateRequest(AcademicFacultyValidation.academicFacultyZodSchema),
  auth(ENUM_USER_ROLL.SUPER_ADMIN, ENUM_USER_ROLL.ADMIN),
  AcademicFacultyController.createAcademicFaculty
);

router.patch(
  "/:id",
  auth(ENUM_USER_ROLL.SUPER_ADMIN, ENUM_USER_ROLL.ADMIN),
  AcademicFacultyController.updateFaculty
);
router.get(
  "/:id",
  auth(
    ENUM_USER_ROLL.SUPER_ADMIN,
    ENUM_USER_ROLL.ADMIN,
    ENUM_USER_ROLL.FACULTY,
    ENUM_USER_ROLL.STUDENT
  ),
  AcademicFacultyController.getSingleFaculty
);
router.delete("/:id", AcademicFacultyController.deleteFaculty);
router.get(
  "/",
  auth(
    ENUM_USER_ROLL.SUPER_ADMIN,
    ENUM_USER_ROLL.ADMIN,
    ENUM_USER_ROLL.FACULTY,
    ENUM_USER_ROLL.STUDENT
  ),
  AcademicFacultyController.getAllFaculty
);

export const AcademicFacultyRoute = router;
