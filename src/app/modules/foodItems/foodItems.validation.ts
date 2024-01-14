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
  foodName: z.string().optional(),
  prevPrice: z.number().optional(),
  currentPrice: z.number().optional(),
  availableQuantity: z.number().optional(),
  foodMenuId: z.string().optional(),
  description: z.string().optional(),
  availability: z.boolean().optional(),
});

// !-----
export const FoodItemValidation = {
  createFoodItem,
  updateFoodItem,
};
