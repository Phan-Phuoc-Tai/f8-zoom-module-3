import { z } from "zod";

export const formMsgSchema = z.object({
  msg: z.string().trim(),
});
