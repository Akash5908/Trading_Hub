import { z } from "zod";

export const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: "User name should be atleast if 3 characters!!!" }),
  password: z
    .string()
    .min(8, { message: "Password should be atleast 8 digits!!!" }),
});
