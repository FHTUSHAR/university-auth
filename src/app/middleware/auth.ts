import { NextFunction, Request, Response } from "express";
import ApiError from "../../error/ApiError";
import httpStatus from "http-status";
import { verifyToken } from "../../helpers/jwtHelper";
import config from "../../config";
import { Secret } from "jsonwebtoken";

const auth =
  (...requiredRole: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }
      let verifiedUser = null;

      verifiedUser = verifyToken(token, config.jwt_secret as Secret);

      req.user = verifiedUser; //role,userId

      const isValidUser = requiredRole?.includes(verifiedUser?.role);
      if (!isValidUser) {
        throw new ApiError(httpStatus.FORBIDDEN, "FORBIDDEN");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
export default auth;
