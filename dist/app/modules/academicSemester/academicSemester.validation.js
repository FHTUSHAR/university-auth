"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterValidation = void 0;
const zod_1 = require("zod");
const academicSemester_constant_1 = require("./academicSemester.constant");
const academicSemesterZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.enum([...academicSemester_constant_1.title], {
            required_error: "title is required",
        }),
        year: zod_1.z.number({
            required_error: "year is required",
        }),
        code: zod_1.z.enum([...academicSemester_constant_1.code], {
            required_error: "code is required",
        }),
        startMonth: zod_1.z.enum([...academicSemester_constant_1.months], {
            required_error: "startMonth is required",
        }),
        endMonth: zod_1.z.enum([...academicSemester_constant_1.months], {
            required_error: "endMonth is required",
        }),
    }),
});
const updateSemesterZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.enum([...academicSemester_constant_1.title], {
            required_error: "title is required",
        }).optional(),
        year: zod_1.z.number({
            required_error: "year is required",
        }).optional(),
        code: zod_1.z.enum([...academicSemester_constant_1.code], {
            required_error: "code is required",
        }).optional(),
        startMonth: zod_1.z.enum([...academicSemester_constant_1.months], {
            required_error: "startMonth is required",
        }).optional(),
        endMonth: zod_1.z.enum([...academicSemester_constant_1.months], {
            required_error: "endMonth is required",
        }).optional(),
    }),
}).refine((data) => (data.body.title && data.body.code) || (!data.body.title && !data.body.code), {
    message: 'Either give me both title and code or neither'
});
exports.AcademicSemesterValidation = {
    academicSemesterZodSchema,
    updateSemesterZodSchema
};
