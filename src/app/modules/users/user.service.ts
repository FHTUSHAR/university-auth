import config from "../../../config";
import ApiError from "../../../error/ApiError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { generateUserId } from "./user.utils";

const createUser = async (user: IUser) => {
  const userId=await generateUserId()
  user.id=userId;
    //auto generated incremental id
    //default password
    if(!user.password){
      user.password=config.default_user_password as string
    }
  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(400,"User do not created successfully");
  }
  return createdUser;
};
export default {createUser};
