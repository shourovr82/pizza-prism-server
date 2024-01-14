import { z } from "zod";

const updateRestaurant = z.object({
  oldProfileImagePath: z.string().optional(),
  restaurantName: z.string().optional(),
  restaurantEmail: z.string().optional(),
  restaurantSecondaryEmail: z.string().optional(),
  contactNumber: z.number().optional(),
  emergencyContactNumber: z.number().optional(),
  restaurantFacebook: z.number().optional(),
  restaurantInstagram: z.number().optional(),
  restaurantDescription: z.number().optional(),
});

// !-----
export const RestaurantValidation = {
  updateRestaurant,
};
