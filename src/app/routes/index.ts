import express from "express";

import { AuthRoutes } from "../modules/auth/auth.routes";
import { UserRoutes } from "../modules/users/users.routes";
import { RestaurantRoutes } from "../modules/restaurantInformation/restaurantInformation.routes";
import { FoodMenuRoutes } from "../modules/foodMenu/foodMenu.routes";
import { FoodItemsRoutes } from "../modules/foodItems/foodItems.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/restaurant",
    route: RestaurantRoutes,
  },
  {
    path: "/food-menu",
    route: FoodMenuRoutes,
  },
  {
    path: "/food-items",
    route: FoodItemsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
