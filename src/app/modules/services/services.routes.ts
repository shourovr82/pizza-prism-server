import express from "express";
import { ServicesController } from "./services.controller";
import auth from "../../middlewares/auth";
import { UserRoles } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import { ServicesValidation } from "./services.validation";
const router = express.Router();

// ! get all tenants
router.get("/get-all-services", auth(UserRoles.PROPERTY_OWNER, UserRoles.SUPERADMIN), ServicesController.getAllServices);
router.get("/get-single-service/:serviceId", auth(UserRoles.PROPERTY_OWNER, UserRoles.SUPERADMIN), ServicesController.getSingleService);
// ! create or update service details
router.put("/create-or-update-service", auth(UserRoles.SERVICE_PROVIDER), validateRequest(ServicesValidation.createOrUpdateService), ServicesController.createOrUpdateService);

export const ServicesRoutes = router;
