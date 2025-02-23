"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodValidationError = (error) => {
    const errorMessage = error.issues.map((issue) => ({
        path: issue === null || issue === void 0 ? void 0 : issue.path[1],
        message: issue === null || issue === void 0 ? void 0 : issue.message,
    }));
    return {
        statusCode: 400,
        message: "Validation Error",
        errorMessages: errorMessage,
    };
};
exports.default = handleZodValidationError;
