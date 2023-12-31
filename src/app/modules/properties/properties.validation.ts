import { z } from 'zod';

const createProperty = z.object({
  numOfBed: z.number({
    invalid_type_error: 'Number of Bed must be in Integer',
    required_error: 'Number of Bed is Required',
  }),
  numOfBath: z.number({
    invalid_type_error: 'Number of Bath must be in Integer',
    required_error: 'Number of Bath is Required',
  }),
  address: z.string({
    invalid_type_error: 'Address must be in String',
    required_error: 'Address is Required',
  }),
  description: z.string({
    invalid_type_error: 'Description must be in String',
    required_error: 'Description is Required',
  }),
  maintenanceCoveredTenant: z.string({
    invalid_type_error: 'Maintenance Covered Tenant must be in String',
    required_error: 'Maintenance Covered Tenant is Required',
  }),
  maintenanceCoveredOwner: z.string({
    invalid_type_error: 'Maintenance Covered Owner must be in String',
    required_error: 'Maintenance Covered Owner is Required',
  }),
  schools: z.string({
    invalid_type_error: 'Schools must be in String',
    required_error: 'Style No is Required',
  }),
  universities: z.string({
    invalid_type_error: 'Universities must be in String',
    required_error: 'Universities is Required',
  }),
  allowedPets: z.string({
    invalid_type_error: 'Allowed Pets must be in String',
    required_error: 'Allowed Pets must is Required',
  }),
});
const updateProperty = z.object({
  numOfBed: z
    .number({
      invalid_type_error: 'Number of Bed must be in Integer',
    })
    .optional(),
  numOfBath: z
    .number({
      invalid_type_error: 'Number of Bath must be in Integer',
    })
    .optional(),
  address: z
    .string({
      invalid_type_error: 'Address must be in String',
    })
    .optional(),
  description: z
    .string({
      invalid_type_error: 'Description must be in String',
    })
    .optional(),
  maintenanceCoveredTenant: z
    .string({
      invalid_type_error: 'Maintenance Covered Tenant must be in String',
    })
    .optional(),
  maintenanceCoveredOwner: z
    .string({
      invalid_type_error: 'Maintenance Covered Owner must be in String',
    })
    .optional(),
  schools: z
    .string({
      invalid_type_error: 'Schools must be in String',
    })
    .optional(),
  universities: z
    .string({
      invalid_type_error: 'Universities must be in String',
    })
    .optional(),
  allowedPets: z
    .string({
      invalid_type_error: 'Allowed Pets must be in String',
    })
    .optional(),
});

export const PropertiesValidation = {
  createProperty,
  updateProperty,
};
