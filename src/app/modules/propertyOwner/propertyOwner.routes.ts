import express, { NextFunction, Request, Response } from "express";
import { PropertyOwnerControllers } from "./propertyOwnerControllers";
import auth from "../../middlewares/auth";
import { UserRoles } from "@prisma/client";
import { FileUploadHelper } from "../../../helpers/FileUploadHelper";
import { PropertyOwnerValidation } from "./PropertyOwner.validation";

const router = express.Router();
// ! get all property owners
router.get("/get-all-property-owners", auth(UserRoles.SUPERADMIN, UserRoles.SERVICE_PROVIDER), PropertyOwnerControllers.getAllPropertyOwners);

// ! get single property owner
router.get(
  "/get-single-property-owner/:propertyOwnerId",
  auth(UserRoles.SUPERADMIN, UserRoles.SERVICE_PROVIDER, UserRoles.PROPERTY_OWNER),
  PropertyOwnerControllers.getSinglePropertyOwner,
);

// ! update property owner
router.patch(
  "/update-profile/:propertyOwnerId",
  auth(UserRoles.PROPERTY_OWNER),
  FileUploadHelper.uploadUpdatedUserImage.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = PropertyOwnerValidation.updatePropertyOwner.parse(JSON.parse(req.body.data));
    return PropertyOwnerControllers.UpdatePropertyOwner(req, res, next);
  },
);

export const PropertyOwnerRouter = router;
