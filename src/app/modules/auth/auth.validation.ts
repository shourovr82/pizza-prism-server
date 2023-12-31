import { z } from "zod";
import { ZodUserRoles } from "./auth.constants";

const createUser = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is Required",
    }),
    firstName: z.string({
      required_error: "First Name is Required",
    }),
    lastName: z.string({
      required_error: "Last Name is Required",
    }),
    password: z.string({
      required_error: "Password is Required",
    }),
  }),
});
// ! create other user
const createOtherUser = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is Required",
    }),
    firstName: z.string({
      required_error: "First Name is Required",
    }),
    lastName: z.string({
      required_error: "Last Name is Required",
    }),
    password: z.string({
      required_error: "Password is Required",
    }),
    role: z.enum([...ZodUserRoles] as [string, ...string[]], {
      invalid_type_error: "role must be in string",
    }),
  }),
});
// ! login user
const loginUser = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is Required",
    }),
    password: z.string({
      required_error: "Password is Required",
    }),
  }),
});

export const AuthValidation = {
  createUser,
  loginUser,
  createOtherUser,
};
