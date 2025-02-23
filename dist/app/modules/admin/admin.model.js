"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = exports.adminSchema = void 0;
const mongoose_1 = require("mongoose");
exports.adminSchema = new mongoose_1.Schema({
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
                type: String
            },
            lastName: {
                type: String,
                required: true
            },
        }
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contactNo: {
        type: String,
        required: true
    },
    emergencyContactNo: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    permanentAddress: {
        type: String,
        required: true
    },
    presentAddress: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
    },
    designation: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
    },
    managementDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'ManagementDepartment'
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
exports.Admin = (0, mongoose_1.model)("Admin", exports.adminSchema);
