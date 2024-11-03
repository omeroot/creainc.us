import { z } from "zod";

export const LoginRequestSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" }),
});

export type LoginPostData = z.infer<typeof LoginRequestSchema>;
