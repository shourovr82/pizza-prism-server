import { z } from "zod";
import { ZodUserGender, ZodUserRoles } from "./auth.constants";

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
    phoneNumber: z.string({
      required_error: "phoneNumber is Required",
    }),
    gender: z.enum([...ZodUserGender] as [string, ...string[]], {
      required_error: "gender is Required",
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
    phoneNumber: z.string({
      required_error: "phoneNumber is Required",
    }),
    gender: z.enum([...ZodUserGender] as [string, ...string[]], {
      required_error: "gender is Required",
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
