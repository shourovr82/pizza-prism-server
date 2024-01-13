import { z } from "zod";

const createFoodItem = z.object({
  foodName: z.string({
    required_error: "foodName is required",
  }),
  prevPrice: z.number().optional(),
  currentPrice: z.number({
    required_error: "food Current Price is required",
  }),
  availableQuantity: z.number({
    required_error: "availableQuantity is required",
  }),
  foodMenuId: z.string({
    required_error: "foodMenuId is required",
  }),

  description: z.string().optional(),
});
const updateFoodItem = z.object({
  oldProfileImagePath: z.string().optional(),
  menuName: z.string().optional(),
  menuDescription: z.string().optional(),
});

// !-----
export const FoodItemValidation = {
  createFoodItem,
  updateFoodItem,
};
