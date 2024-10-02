import express from "express";
import userRouter from "../modules/users/user.route";
import { AcademicSemesterRoute } from "../modules/academicSemester/academicSemester.route";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/academic-semester",
    route: AcademicSemesterRoute,
  },
];
moduleRoutes.map((route) => router.use(route.path, route.route));

export default router;
