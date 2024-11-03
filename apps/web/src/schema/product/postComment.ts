import { z } from "zod";

export const PostCommentSchema = z.object({
  // string number
  id: z.coerce.number(),
  comment: z
    .string({ required_error: "Comment is required" })
    .min(10, { message: "Comment must be at least 10 characters" }),
  rating: z.coerce
    .number()
    .int()
    .min(1, { message: "Rating must be at least 1" })
    .max(5),
});

export type CommentPostData = z.infer<typeof PostCommentSchema>;
