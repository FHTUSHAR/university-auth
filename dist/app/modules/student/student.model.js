"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = exports.studentSchema = void 0;
const mongoose_1 = require("mongoose");
exports.studentSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: {
            firstName: {
                type: String,
                required: true
            },
            middleName: {
                type: String,
            },
            lastName: {
                type: String,
                required: true
            },
        }
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    dateOfBirth: {
        type: String,
    },
    guardian: {
        type: {
            fatherName: {
                type: String,
                required: true
            },
            fatherOccupation: {
                type: String,
                required: true
            },
            fatherContactNumber: {
                type: String,
                required: true
            },
            motherName: {
                type: String,
                required: true
            },
            motherOccupation: {
                type: String,
                required: true
            },
            motherContactNumber: {
                type: String,
                required: true
            },
            address: {
                type: String,
                required: true
            },
        }
    },
    localGurdian: {
        type: {
            name: {
                type: String,
                required: true
            },
            occupation: {
                type: String,
            },
            contactNumber: {
                type: String,
                required: true
            },
            address: {
                type: String,
                required: true
            }
        }
    },
    contactNo: {
        type: String,
        required: true
    },
    emergencyContactNo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    presentAddress: {
        type: String,
        required: true
    },
    permanentAddress: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
    },
    academicSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicSemester'
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicDepartment'
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicFaculty'
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
exports.Student = (0, mongoose_1.model)("Student", exports.studentSchema);
