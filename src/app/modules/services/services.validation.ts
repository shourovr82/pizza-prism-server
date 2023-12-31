import { z } from "zod";
import { ZodServiceAvailability, ZodServiceType } from "./services.constants";

const createOrUpdateService = z.object({
  body: z.object({
    serviceDescription: z
      .string({
        invalid_type_error: "Service Description must be in string",
      })
      .optional(),
    serviceLocation: z
      .string({
        invalid_type_error: "Service Location must be in string",
      })
      .optional(),
    serviceCancellationPolicy: z
      .string({
        invalid_type_error: "Service Cancellation Policy must be in String",
      })
      .optional(),
    servicePriceRange: z
      .string({
        invalid_type_error: "Service Price Range must be in String",
      })
      .optional(),
    serviceAvailability: z
      .enum([...ZodServiceAvailability] as [string, ...string[]], {
        invalid_type_error: "Service Availability must be String",
      })
      .optional(),
    serviceType: z
      .enum([...ZodServiceType] as [string, ...string[]], {
        invalid_type_error: "Service Types must be String",
      })
      .optional(),
  }),
});

export const ServicesValidation = {
  createOrUpdateService,
};
