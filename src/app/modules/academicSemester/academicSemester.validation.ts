import { z } from "zod";
import { code, months, title } from "./academicSemester.constant";
import { Code, Months, Title } from "./academicSemester.interface";
const academicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...title] as [string, ...string[]], {
      required_error: "title is required",
    }),
    year: z.number({
      required_error: "year is required",
    }),
    code: z.enum([...code] as [string, ...string[]], {
      required_error: "code is required",
    }),
    startMonth: z.enum([...months] as [string, ...string[]], {
      required_error: "startMonth is required",
    }),
    endMonth: z.enum([...months] as [string, ...string[]], {
      required_error: "endMonth is required",
    }),
  }),
});

const updateSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...title] as [string, ...string[]], {
      required_error: "title is required",
    }).optional(),
    year: z.number({
      required_error: "year is required",
    }).optional(),
    code: z.enum([...code] as [string, ...string[]], {
      required_error: "code is required",
    }).optional(),
    startMonth: z.enum([...months] as [string, ...string[]], {
      required_error: "startMonth is required",
    }).optional(),
    endMonth: z.enum([...months] as [string, ...string[]], {
      required_error: "endMonth is required",
    }).optional(),
  }),
}).refine((data)=>(data.body.title && data.body.code) || (!data.body.title && !data.body.code),{
  message:'Either give me both title and code or neither'
})
export const AcademicSemesterValidation = {
  academicSemesterZodSchema,
  updateSemesterZodSchema
};
