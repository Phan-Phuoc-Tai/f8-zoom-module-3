import { z } from "zod";

export const formUpdateProfile = z.object({
  fullName: z.string().trim().min(1, {
    message: "Họ và tên không được để trống",
  }),
  bio: z.string().trim(),
  website: z.string().trim(),
  gender: z.enum(["male", "female", "other"]).optional(),
  profilePicture: z.any().optional(),
});
