import { ErrorRequestHandler } from "express";
import config from "../../config/index";
import { IGenericErrorMessage } from "../../interfaces/error";
import { handleValidationError } from "../../error/handleValidationError";
import ApiError from "../../error/ApiError";
import { errorlogger } from "../../shared/logger";
import { ZodError } from "zod";
import handleZodValidationError from "../../error/handleZodValidationError";
import handleCastError from "../../error/handleCastError";
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  config.env === "development"
    ? console.log("globalErrorHandler~", error)
    : errorlogger.error("globalErrorHandler~", error);
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorMessages: IGenericErrorMessage[] = [];
  if (error.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error.name === "CastError") {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [{ path: "", message: error?.message }]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [{ path: "", message: error?.message }]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env === "development" ? error?.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
