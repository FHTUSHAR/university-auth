import httpStatus from "http-status";
import ApiError from "../../../error/ApiError";
import { User } from "../users/user.model";
import { ILoginUser } from "./auth.interface";
import jwt, { Secret } from "jsonwebtoken";
import config from "../../../config";
import { createToken } from "../../../helpers/jwtHelper";

const login = async (payload: ILoginUser): Promise<any> => {
  const { id, password } = payload;

  // const user = new User()
  //check user exist

  console.log(id);
  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  //match password
  if (isUserExist?.password) {
    const isPasswordMatch = await User.isPasswordExist(
      password,
      isUserExist?.password
    );
    if (!isPasswordMatch) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Wrong Password");
    }
  }

  //generatne acess  and refresh token
  const { id: userId, role, needsPasswordChange } = isUserExist;
  const accessToken = createToken(
    { userId, role },
    config.jwt_secret as Secret,
    { expiresIn: config.jwt_expires_in }
  );

  const refreshToken = createToken(
    { userId, role },
    config.jwt_refresh_secret as Secret,
    { expiresIn: config.jwt_refresh_expires_in }
  );

  console.log(accessToken, refreshToken);
  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };

  //   return result;
};

export const AuthService = { login };
