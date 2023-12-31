import express, { NextFunction, Request, Response } from "express";
import { ServiceProviderControllers } from "./serviceProvider.Controllers";
import auth from "../../middlewares/auth";
import { UserRoles } from "@prisma/client";
import { FileUploadHelper } from "../../../helpers/FileUploadHelper";
import { ServiceProviderValidation } from "./serviceProvider.validation";

const router = express.Router();

// ! get all property owners
router.get(
  "/get-all-service-providers",
  auth(UserRoles.SUPERADMIN, UserRoles.SERVICE_PROVIDER, UserRoles.SERVICE_PROVIDER, UserRoles.PROPERTY_OWNER),
  ServiceProviderControllers.getAllServiceProviders,
);

// ! get single service provider
router.get(
  "/get-single-service-provider/:serviceProviderId",
  auth(UserRoles.SUPERADMIN, UserRoles.SERVICE_PROVIDER, UserRoles.PROPERTY_OWNER),
  ServiceProviderControllers.getSingleServiceProvider,
);
// ! getServiceProviderMyProfile
router.get("/get-my-profile", auth(UserRoles.SUPERADMIN, UserRoles.SERVICE_PROVIDER, UserRoles.PROPERTY_OWNER), ServiceProviderControllers.getServiceProviderMyProfile);

// ! update service provider
router.patch(
  "/update-profile/:serviceProviderId",
  auth(UserRoles.SERVICE_PROVIDER, UserRoles.SUPERADMIN),
  FileUploadHelper.uploadUpdatedUserImage.single("file"),

  (req: Request, res: Response, next: NextFunction) => {
    req.body = ServiceProviderValidation.updateServiceProvider.parse(JSON.parse(req.body.data));

    return ServiceProviderControllers.UpdateServiceProvider(req, res, next);
  },
);

export const ServiceProviderRouter = router;
