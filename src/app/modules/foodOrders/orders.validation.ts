import { z } from "zod";
import { ZodPaymentMethodStatus } from "../auth/auth.constants";

const orderItemSchema = z.object({
  quantity: z.number({
    required_error: "quantity is required",
  }),
  foodItemId: z.string({
    required_error: "foodItemId is required",
  }),
});

const createNewFoodOrder = z.object({
  body: z.object({
    orderNumber: z.string({
      required_error: "orderNumber is required",
    }),
    address: z.string({
      required_error: "address is required",
    }),
    importantText: z.string().optional(),
    paymentMethod: z.enum([...ZodPaymentMethodStatus] as [string, ...string[]], {
      required_error: "paymentMethod is Required",
    }),
    orderItems: z.array(orderItemSchema).refine(
      (data) => {
        console.log(data);
        return data?.length > 0;
      },
      {
        message: "orderItems must not be empty and it should be quantity of the food and foodItemId",
      },
    ),
  }),
});

// !-----
export const FoodOrderValidation = {
  createNewFoodOrder,
};
