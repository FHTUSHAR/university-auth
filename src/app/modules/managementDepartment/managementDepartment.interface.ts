import { Model } from "mongoose";

export type IManagementDepartment = {
    title: String;
    createdAt?: Date;
    updatedAt?: Date;
}
export type IManagementDepartmentFilters={
    searchTerm?:string;
    title? :string;
  }

export type ManagementDepartmentModel = Model<IManagementDepartment,Record<string, unknown>>