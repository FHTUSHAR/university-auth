import express from "express";
import  validateRequest  from "../../middleware/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";
import { ENUM_USER_ROLL } from "../../../enum/users";
import auth from "../../middleware/auth";

const router=express.Router()


router.post('/login',validateRequest(AuthValidation.loginZodSchema),AuthController.login)
router.post('/refresh-token',validateRequest(AuthValidation.refreshTokenZodSchema),AuthController.refreshToken)
router.post('/change-password',validateRequest(AuthValidation.changePasswordZodSchema),auth(ENUM_USER_ROLL.SUPER_ADMIN,ENUM_USER_ROLL.ADMIN,ENUM_USER_ROLL.FACULTY,ENUM_USER_ROLL.STUDENT),AuthController.changePassword)

export const AuthRoutes = router;