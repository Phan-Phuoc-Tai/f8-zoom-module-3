import { z } from "zod";

export const formCommentSchema = z.object({
  comment: z.string().trim().min(1, {
    message: "",
  }),
});
