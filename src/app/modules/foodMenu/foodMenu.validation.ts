import { z } from "zod";

const createFoodMenuDetails = z.object({
  menuName: z.string({
    required_error: "menuName is required",
  }),
  menuDescription: z.string().optional(),
});
const updateFoodMenu = z.object({
  oldProfileImagePath: z.string().optional(),
  menuName: z.string().optional(),
  menuDescription: z.string().optional(),
});

// !-----
export const FoodMenuValidation = {
  updateFoodMenu,
  createFoodMenuDetails,
};
