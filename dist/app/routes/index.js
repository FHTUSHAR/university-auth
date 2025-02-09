"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/users/user.route");
const academicSemester_route_1 = require("../modules/academicSemester/academicSemester.route");
const academicFaculty_route_1 = require("../modules/academicFaculty/academicFaculty.route");
const academicDepartment_route_1 = require("../modules/academicDepartment/academicDepartment.route");
const student_route_1 = require("../modules/student/student.route");
const faculty_route_1 = require("../modules/faculty/faculty.route");
const ManagementDepartment_routes_1 = require("../modules/managementDepartment/ManagementDepartment.routes");
const admin_route_1 = require("../modules/admin/admin.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/user",
        route: user_route_1.UserRoute,
    },
    {
        path: "/academic-semester",
        route: academicSemester_route_1.AcademicSemesterRoute,
    },
    {
        path: "/academic-faculty",
        route: academicFaculty_route_1.AcademicFacultyRoute,
    },
    {
        path: "/academic-departments",
        route: academicDepartment_route_1.AcademicDepartmentRoute,
    },
    {
        path: "/students",
        route: student_route_1.StudentRoutes,
    },
    {
        path: "/faculty",
        route: faculty_route_1.FacultyRoutes,
    },
    {
        path: "/management-department",
        route: ManagementDepartment_routes_1.ManagementDepartmentRoutes,
    },
    {
        path: "/admin",
        route: admin_route_1.AdminRoutes,
    },
];
moduleRoutes.map((route) => router.use(route.path, route.route));
exports.default = router;
