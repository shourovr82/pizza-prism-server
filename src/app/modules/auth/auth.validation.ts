import { z } from "zod";

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
};
