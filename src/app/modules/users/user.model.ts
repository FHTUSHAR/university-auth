import { model, Schema } from "mongoose";
// import { IUser, IUserMethods, UserModel } from "./user.interface";
import { IUser, UserModel } from "./user.interface";
import config from "../../../config";
import bcrypt from 'bcrypt'



// const userSchema = new Schema<IUser, Record<string, unknown>,IUserMethods>(
  const userSchema = new Schema<IUser,UserModel>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true,select:0 },
    student: {type:Schema.Types.ObjectId, ref:'Student'},
    faculty: {type:Schema.Types.ObjectId, ref:'Faculty'},
    admin: {type:Schema.Types.ObjectId, ref:'Admin'},
    needsPasswordChange:{type: Boolean, default:true},
    passwordChangedAt:{type:Date}
  },
  {
    timestamps: true,
    toJSON:{
      virtuals:true
    }
  }
);
// userSchema.methods.isUserExist = async function (id:string):Promise<Partial<IUser> | null>{
//   const user = await User.findOne({id},{id:1,password:1,needsPaawordChange:1}).lean()
//   return user;
// }

// userSchema.methods.isPasswordExist = async function (givenPassword:string,savedPassword:string):Promise<boolean>{
//   const isPasswordMatch = await bcrypt.compare(givenPassword,savedPassword)
//   return isPasswordMatch;
// }

userSchema.statics.isUserExist= async function(id:string):Promise<Partial<IUser> | null>{
  const user = await User.findOne({id},{id:1,password:1,needsPasswordChange:1,role:1}).lean()
  return user;
}

userSchema.statics.isPasswordExist= async function(givenPassword:string,savedPassword:string):Promise<boolean>{
    const isPasswordMatch = await bcrypt.compare(givenPassword,savedPassword)
    return isPasswordMatch;
}
userSchema.pre('save',async function(next){
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_round))
  next()
})

export const User = model<IUser, UserModel>("User", userSchema);
