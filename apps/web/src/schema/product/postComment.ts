import { z } from "zod";

export const PostCommentSchema = z.object({
  // string number
  id: z.coerce.number(),
  rating: z.coerce.number().int().min(1, { message: "Rating is required" }),
  comment: z.string({ required_error: "Comment is required" }).min(1),
});

export type CommentPostData = z.infer<typeof PostCommentSchema>;
