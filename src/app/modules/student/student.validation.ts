import { z } from "zod";

const updateStudentZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().optional(),
      middleName: z.string().optional(),
      lastName: z.string().optional(),
    }).optional(),
    gender: z.enum(['male', 'female']).optional(),
    dateOfBirth: z.string().optional(),
    guardian: z.object({
      fatherName: z.string().optional(),
      fatherOccupation: z.string().optional(),
      fatherContactNumber: z.string().optional(),
      motherName: z.string().optional(),
      motherOccupation: z.string().optional(),
      motherContactNumber: z.string().optional(),
      address: z.string().optional(),
    }).optional(),
    localGurdian: z.object({
      name: z.string().optional(),
      occupation: z.string().optional(),
      contactNumber: z.string().optional(),
      address: z.string().optional(),
    }).optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    email: z.string().email().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    bloodGroup: z.string().optional(),
    academicSemester: z.string().optional(),
    academicDepartment: z.string().optional(),
    academicFaculty: z.string().optional(),
    profileImage: z.string().optional(),
  }),
});

export const StudentValidation = {
  updateStudentZodSchema,
};
