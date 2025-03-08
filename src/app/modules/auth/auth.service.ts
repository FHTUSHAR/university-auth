import httpStatus from "http-status";
import ApiError from "../../../error/ApiError";
import { User } from "../users/user.model";
import { ILoginUser } from "./auth.interface";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { createToken, verifyToken } from "../../../helpers/jwtHelper";
import bcrypt from 'bcrypt'

const login = async (payload: ILoginUser): Promise<any> => {
  const { id, password } = payload;

  // const user = new User()
  //check user exist

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

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };

  //   return result;
};
const refreshToken = async (token: string): Promise<any> => {
  // verify token
  let verifiedToken;
  try {
    verifiedToken = verifyToken(token, config.jwt_refresh_secret as string);
  } catch (err) {
    // err
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid refresh token");
  }

  //checking is user exist

  const { userId, role } = verifiedToken;

  const isUserExist = await User.isUserExist(userId);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist ");
  }

  const newAccessToken = createToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt_secret as Secret,
    { expiresIn: config.jwt_expires_in }
  );

  return { accessToken: newAccessToken };
};

const changePassword = async (passwordData: any, user: any):Promise<void> => {
  const { userId, role } = user;
  const { oldPassword, newPassword } = passwordData;

  const userDetails = await User.isUserExist(userId)
  if (!userDetails) {
    throw new ApiError(httpStatus.NOT_FOUND,"User not found");
  }

  const isPasswordExist = await User.isPasswordExist(
    oldPassword,
    userDetails?.password as string
  );
  if (!isPasswordExist) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Wrong Password");
  }
  const hashedPassword = await bcrypt.hash(newPassword, Number(config.bcrypt_salt_round))
   await User.findOneAndUpdate(
    { id: userId }, 
    { password: hashedPassword,
      needsPasswordChange:false,
      passwordChangedAt:new Date()
     }, 
    { new: true }
  );
 
};

export const AuthService = { login, refreshToken,changePassword };
