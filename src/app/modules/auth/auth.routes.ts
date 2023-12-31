import express from "express";
import { AuthController } from "./auth.controller";
import auth from "../../middlewares/auth";
import { UserRoles } from "@prisma/client";
// import { UserRoles } from '@prisma/client';
// import auth from '../../middlewares/auth';

const router = express.Router();

router.post("/user/create", AuthController.createUser);

router.post(
  "/tenant/create-user",

  // validateRequest(UserValidation.createUser),
  AuthController.createNewUserForTenant,
);

router.post(
  "/property-owner/create-user",

  // validateRequest(UserValidation.createUser),
  AuthController.createNewUserForPropertyOwner,
);

router.post(
  "/service-provider/create-user",

  // validateRequest(UserValidation.createUser),
  AuthController.createNewUserForServiceProvider,
);

router.post("/login", AuthController.userLogin);

router.post("/refresh-token", auth(UserRoles.SUPERADMIN, UserRoles.SERVICE_PROVIDER, UserRoles.PROPERTY_OWNER, UserRoles.TENANT), AuthController.refreshToken);

export const AuthRoutes = router;
