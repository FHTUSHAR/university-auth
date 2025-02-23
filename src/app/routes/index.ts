import express from "express";
import { UserRoute } from "../modules/users/user.route";
import { AcademicSemesterRoute } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoute } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoute } from "../modules/academicDepartment/academicDepartment.route";
import { StudentRoutes } from "../modules/student/student.route";
import { FacultyRoutes } from "../modules/faculty/faculty.route";
import { ManagementDepartmentRoutes } from "../modules/managementDepartment/ManagementDepartment.routes";
import { AdminRoutes } from "../modules/admin/admin.route";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoute,
  },
  {
    path: "/academic-semester",
    route: AcademicSemesterRoute,
  },
  {
    path: "/academic-faculty",
    route: AcademicFacultyRoute,
  },
  {
    path: "/academic-departments",
    route: AcademicDepartmentRoute,
  },
  {
    path: "/students",
    route: StudentRoutes,
  },
  {
    path: "/faculty",
    route: FacultyRoutes,
  },
  {
    path: "/management-department",
    route: ManagementDepartmentRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
];
moduleRoutes.map((route) => router.use(route.path, route.route));

export default router;
