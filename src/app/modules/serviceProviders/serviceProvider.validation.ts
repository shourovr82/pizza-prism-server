import { z } from 'zod';

const updateServiceProvider = z.object({
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
  companyName: z
    .string({
      invalid_type_error: 'Company Name must be in String',
    })
    .optional(),
  companyAddress: z
    .string({
      invalid_type_error: 'Company Address must be in String',
    })
    .optional(),
  companyPhoneNumber: z
    .string({
      invalid_type_error: 'Company Phone Number must be in String',
    })
    .optional(),
  companyEmailAddress: z
    .string({
      invalid_type_error: 'Company Email Address must be in String',
    })
    .optional(),
});

export const ServiceProviderValidation = {
  updateServiceProvider,
};
