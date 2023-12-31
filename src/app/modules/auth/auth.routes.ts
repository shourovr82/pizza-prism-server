import express from "express";
import { AuthController } from "./auth.controller";
import auth from "../../middlewares/auth";
import { UserRoles } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
const router = express.Router();
// ! customer sign up
router.post("/sign-up", validateRequest(AuthValidation.createUser), AuthController.createNewUser);

// ! other user creation
router.post("/other/create-user", auth(UserRoles.SUPERADMIN), validateRequest(AuthValidation.createOtherUser), AuthController.createOtherUser);

// ! UserLogin
router.post("/login", validateRequest(AuthValidation.loginUser), AuthController.userLogin);

// ! refresh token
router.post("/refresh-token", AuthController.refreshToken);

export const AuthRoutes = router;
