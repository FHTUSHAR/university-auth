import { Model, model, Schema } from "mongoose";
import {
  IAcademicSemester,
  AcademicSemesterModel,
} from "./academicSemester.interface";
import { code, months, title } from "./academicSemester.constant";
import ApiError from "../../../error/ApiError";
import status from "http-status";

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: { type: String, required: true, enum: title },
    year: { type: String, required: true },
    code: { type: String, required: true, enum: code },
    startMonth: { type: String, required: true, enum: months },
    endMonth: { type: String, required: true, enum: months },
  },
  {
    timestamps: true,
  }
);
academicSemesterSchema.pre("save", async function (next) {
  const isExit = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExit) {
    throw new ApiError(status.CONFLICT, "Academic Semester is already exist!");
  }
  next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  "AcademicSemester",
  academicSemesterSchema
);
