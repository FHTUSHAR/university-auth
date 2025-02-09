"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../config/index"));
const handleValidationError_1 = require("../../error/handleValidationError");
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const zod_1 = require("zod");
const handleZodValidationError_1 = __importDefault(require("../../error/handleZodValidationError"));
const handleCastError_1 = __importDefault(require("../../error/handleCastError"));
const globalErrorHandler = (error, req, res, next) => {
    index_1.default.env === "development"
        ? console.log("globalErrorHandler~", error)
        : console.log("globalErrorHandler~", error);
    let statusCode = 500;
    let message = "Something went wrong!";
    let errorMessages = [];
    if (error.name === "ValidationError") {
        const simplifiedError = (0, handleValidationError_1.handleValidationError)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodValidationError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (error.name === "CastError") {
        const simplifiedError = (0, handleCastError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (error instanceof ApiError_1.default) {
        statusCode = error.statusCode;
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [{ path: "", message: error === null || error === void 0 ? void 0 : error.message }]
            : [];
    }
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [{ path: "", message: error === null || error === void 0 ? void 0 : error.message }]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: index_1.default.env === "development" ? error === null || error === void 0 ? void 0 : error.stack : undefined,
    });
};
exports.default = globalErrorHandler;
