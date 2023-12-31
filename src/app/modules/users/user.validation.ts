import { z } from "zod";
import { ZodUserRoles, ZodUserStatus } from "../auth/auth.constants";

const updateProfile = z.object({
  email: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z.string().optional(),
  phoneNumber: z.number().optional(),
  role: z
    .enum([...ZodUserRoles] as [string, ...string[]], {
      invalid_type_error: "Role must be in string",
    })
    .optional(),

  userStatus: z
    .enum([...ZodUserStatus] as [string, ...string[]], {
      invalid_type_error: "User Status must be in string",
    })
    .optional(),
});

// !-----
export const UserValidation = {
  updateProfile,
};
