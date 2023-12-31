import express from "express";

import { AuthRoutes } from "../modules/auth/auth.routes";

import { PropertiesRoutes } from "../modules/properties/properties.routes";
import { PropertyOwnerRouter } from "../modules/propertyOwner/propertyOwner.routes";
import { ServiceProviderRouter } from "../modules/serviceProviders/serviceProvider.routes";
import { TenantsRouters } from "../modules/tenants/tenants.routes";
import { ServicesRoutes } from "../modules/services/services.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/property-owners",
    route: PropertyOwnerRouter,
  },
  {
    path: "/service-providers",
    route: ServiceProviderRouter,
  },
  {
    path: "/tenants",
    route: TenantsRouters,
  },
  {
    path: "/properties",
    route: PropertiesRoutes,
  },
  {
    path: "/services",
    route: ServicesRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
