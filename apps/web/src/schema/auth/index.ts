import { z } from "zod";

export const LoginRequestSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 8 characters" }),
});

export type Login = z.infer<typeof LoginRequestSchema>;
