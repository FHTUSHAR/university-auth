import { z } from "zod";
const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: "First name is required",
        }),
        middleName: z.string().optional(),
        lastName: z.string({
          required_error: "Last name is required",
        }),
      }),
      gender: z.enum(["male", "female"], {
        required_error: "Gender name is required",
      }),
      dateOfBirth: z.string({
        required_error: "Date of Birth name is required",
      }),
      guardian: z.object({
        fatherName: z.string({
          required_error: "fatherName is required",
        }),
        fatherOccupation: z.string({
          required_error: "fatherOccupation is required",
        }),
        fatherContactNumber: z.string({
          required_error: "fatherContactNumber is required",
        }),
        motherName: z.string({
          required_error: "motherName is required",
        }),
        motherOccupation: z.string({
          required_error: "motherOccupation is required",
        }),
        motherContactNumber: z.string({
          required_error: "motherContactNumber is required",
        }),
        address: z.string({
          required_error: "address is required",
        }),
      }),
      localGurdian: z.object({
        name: z.string({
          required_error: "localGurdian name is required",
        }),
        occupation: z.string({
          required_error: " localGurdianoccupation is required",
        }),
        contactNumber: z.string({
          required_error: "localGurdian contactNumber is required",
        }),
        address: z.string({
          required_error: "localGurdian address is required",
        }),
      }),
      contactNo: z.string({
        required_error: "contactNo is required",
      }),
      emergencyContactNo: z.string({
        required_error: "emergencyContactNo is required",
      }),
      email: z
        .string({
          required_error: "email is required",
        })
        .email(),
      presentAddress: z.string({
        required_error: "presentAddress is required",
      }),
      permanentAddress: z.string({
        required_error: "permanenAddress is required",
      }),
      bloodGroup: z.string({
        required_error: "bloodGroup is required",
      }),
      academicSemester: z.string({
        required_error: "Academic Semester is required",
      }),
      academicDepartment: z.string({
        required_error: "Academic Department is required",
      }),
      academicFaculty: z.string({
        required_error: "Academic Faculty is required",
      }),
      profileImage: z.string().optional(),
    }),
  }),
});

export const createFacultyZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z.object({
      name: z.object({
        firstName: z.string({ required_error: "firstName is required" }),
        middleName: z.string().optional(),
        lastName: z.string({ required_error: "lastName is required" }),
      }),
      dateOfBirth: z.string({ required_error: "dateOfBirth is required" }),
      email: z
        .string({
          required_error: "email is required",
        })
        .email(),
      contactNo: z.string({ required_error: "contactNo is required" }),
      emergencyContactNo: z.string({
        required_error: "emergencyContactNo is required",
      }),
      gender: z.enum(["male", "female"], {
        required_error: "gender is required",
      }),
      permanentAddress: z.string({
        required_error: "permanentAddress is required",
      }),
      presentAddress: z.string({
        required_error: "presentAddress is required",
      }),
      bloodGroup: z.string().optional(),
      designation: z.string({ required_error: "designation is required" }),
      profileImage: z.string().optional(),
      academicDepartment: z.string({
        required_error: "Academic Department is required",
      }),
      academicFaculty: z.string({
        required_error: "Academic Faculty is required",
      }),
    }),
  }),
});

export const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z.object({
      name: z.object({
        firstName: z.string({ required_error: "firstName is required" }),
        middleName: z.string().optional(),
        lastName: z.string({ required_error: "lastName is required" }),
      }),
      dateOfBirth: z.string({ required_error: "dateOfBirth is required" }),
      email: z
        .string({
          required_error: "email is required",
        })
        .email(),
      contactNo: z.string({ required_error: "contactNo is required" }),
      emergencyContactNo: z.string({
        required_error: "emergencyContactNo is required",
      }),
      gender: z.enum(["male", "female"], {
        required_error: "gender is required",
      }),
      permanentAddress: z.string({
        required_error: "permanentAddress is required",
      }),
      presentAddress: z.string({
        required_error: "presentAddress is required",
      }),
      bloodGroup: z.string().optional(),
      designation: z.string({ required_error: "designation is required" }),
      profileImage: z.string().optional(),
      managementDepartment: z.string({
        required_error: "Management Department is required",
      }),
    }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  createFacultyZodSchema,
  createAdminZodSchema
};
