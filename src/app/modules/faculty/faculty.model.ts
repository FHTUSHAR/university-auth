import { model, Schema } from "mongoose";
import { FacultyModel, IFaculty } from "./faculty.interface";

export const facultySchema = new Schema<IFaculty>({
    id:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:{
            firstName:{
                type:String,
                required:true
            },
            middleName:{
                type:String
            },
            lastName:{
                type:String,
                required:true
            },
        }
    },
    dateOfBirth:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    contactNo:{
        type:String,
        required:true
    },
    emergencyContactNo:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:["male","female"]
    },
    permanentAddress:{
        type:String,
        required:true
    },
    presentAddress:{
        type:String,
        required:true
    },
    bloodGroup :{
        type:String,
    },
    designation :{
        type:String,
        required:true
    },
    profileImage :{
        type:String,
    },
    academicDepartment:{
        type:Schema.Types.ObjectId,
        ref:'AcademicDepartment'
    },
    academicFaculty:{
        type:Schema.Types.ObjectId,
        ref:'AcademicFaculty'
    }
},
{
    timestamps:true,
    toJSON:{
        virtuals:true
    }
})

export const Faculty = model<IFaculty, FacultyModel>("Faculty", facultySchema);
