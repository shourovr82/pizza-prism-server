import { z } from 'zod';

const updatePropertyOwner = z.object({
  firstName: z
    .string({
      invalid_type_error: 'First Name must be in String',
    })
    .optional(),
  lastName: z
    .string({
      invalid_type_error: 'Last Name must be in String',
    })
    .optional(),
  phoneNumber: z
    .string({
      invalid_type_error: 'Phone Number must be in String',
    })
    .optional(),
});

export const PropertyOwnerValidation = {
  updatePropertyOwner,
};
