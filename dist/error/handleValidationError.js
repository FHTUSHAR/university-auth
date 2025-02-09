"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const handleValidationError = (error) => {
    const errorMessage = Object.values(error.errors).map((element) => ({ path: element === null || element === void 0 ? void 0 : element.path, message: element === null || element === void 0 ? void 0 : element.message }));
    return {
        statusCode: 400,
        message: "Validation Error",
        errorMessages: errorMessage,
    };
};
exports.handleValidationError = handleValidationError;
