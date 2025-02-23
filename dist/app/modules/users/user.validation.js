"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = exports.createAdminZodSchema = exports.createFacultyZodSchema = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        student: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: "First name is required",
                }),
                middleName: zod_1.z.string().optional(),
                lastName: zod_1.z.string({
                    required_error: "Last name is required",
                }),
            }),
            gender: zod_1.z.enum(["male", "female"], {
                required_error: "Gender name is required",
            }),
            dateOfBirth: zod_1.z.string({
                required_error: "Date of Birth name is required",
            }),
            guardian: zod_1.z.object({
                fatherName: zod_1.z.string({
                    required_error: "fatherName is required",
                }),
                fatherOccupation: zod_1.z.string({
                    required_error: "fatherOccupation is required",
                }),
                fatherContactNumber: zod_1.z.string({
                    required_error: "fatherContactNumber is required",
                }),
                motherName: zod_1.z.string({
                    required_error: "motherName is required",
                }),
                motherOccupation: zod_1.z.string({
                    required_error: "motherOccupation is required",
                }),
                motherContactNumber: zod_1.z.string({
                    required_error: "motherContactNumber is required",
                }),
                address: zod_1.z.string({
                    required_error: "address is required",
                }),
            }),
            localGurdian: zod_1.z.object({
                name: zod_1.z.string({
                    required_error: "localGurdian name is required",
                }),
                occupation: zod_1.z.string({
                    required_error: " localGurdianoccupation is required",
                }),
                contactNumber: zod_1.z.string({
                    required_error: "localGurdian contactNumber is required",
                }),
                address: zod_1.z.string({
                    required_error: "localGurdian address is required",
                }),
            }),
            contactNo: zod_1.z.string({
                required_error: "contactNo is required",
            }),
            emergencyContactNo: zod_1.z.string({
                required_error: "emergencyContactNo is required",
            }),
            email: zod_1.z
                .string({
                required_error: "email is required",
            })
                .email(),
            presentAddress: zod_1.z.string({
                required_error: "presentAddress is required",
            }),
            permanentAddress: zod_1.z.string({
                required_error: "permanenAddress is required",
            }),
            bloodGroup: zod_1.z.string({
                required_error: "bloodGroup is required",
            }),
            academicSemester: zod_1.z.string({
                required_error: "Academic Semester is required",
            }),
            academicDepartment: zod_1.z.string({
                required_error: "Academic Department is required",
            }),
            academicFaculty: zod_1.z.string({
                required_error: "Academic Faculty is required",
            }),
            profileImage: zod_1.z.string().optional(),
        }),
    }),
});
exports.createFacultyZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        faculty: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({ required_error: "firstName is required" }),
                middleName: zod_1.z.string().optional(),
                lastName: zod_1.z.string({ required_error: "lastName is required" }),
            }),
            dateOfBirth: zod_1.z.string({ required_error: "dateOfBirth is required" }),
            email: zod_1.z
                .string({
                required_error: "email is required",
            })
                .email(),
            contactNo: zod_1.z.string({ required_error: "contactNo is required" }),
            emergencyContactNo: zod_1.z.string({
                required_error: "emergencyContactNo is required",
            }),
            gender: zod_1.z.enum(["male", "female"], {
                required_error: "gender is required",
            }),
            permanentAddress: zod_1.z.string({
                required_error: "permanentAddress is required",
            }),
            presentAddress: zod_1.z.string({
                required_error: "presentAddress is required",
            }),
            bloodGroup: zod_1.z.string().optional(),
            designation: zod_1.z.string({ required_error: "designation is required" }),
            profileImage: zod_1.z.string().optional(),
            academicDepartment: zod_1.z.string({
                required_error: "Academic Department is required",
            }),
            academicFaculty: zod_1.z.string({
                required_error: "Academic Faculty is required",
            }),
        }),
    }),
});
exports.createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        admin: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({ required_error: "firstName is required" }),
                middleName: zod_1.z.string().optional(),
                lastName: zod_1.z.string({ required_error: "lastName is required" }),
            }),
            dateOfBirth: zod_1.z.string({ required_error: "dateOfBirth is required" }),
            email: zod_1.z
                .string({
                required_error: "email is required",
            })
                .email(),
            contactNo: zod_1.z.string({ required_error: "contactNo is required" }),
            emergencyContactNo: zod_1.z.string({
                required_error: "emergencyContactNo is required",
            }),
            gender: zod_1.z.enum(["male", "female"], {
                required_error: "gender is required",
            }),
            permanentAddress: zod_1.z.string({
                required_error: "permanentAddress is required",
            }),
            presentAddress: zod_1.z.string({
                required_error: "presentAddress is required",
            }),
            bloodGroup: zod_1.z.string().optional(),
            designation: zod_1.z.string({ required_error: "designation is required" }),
            profileImage: zod_1.z.string().optional(),
            managementDepartment: zod_1.z.string({
                required_error: "Management Department is required",
            }),
        }),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
    createFacultyZodSchema: exports.createFacultyZodSchema,
    createAdminZodSchema: exports.createAdminZodSchema
};
