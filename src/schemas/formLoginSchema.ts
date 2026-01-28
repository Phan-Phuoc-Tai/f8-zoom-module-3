import { z } from "zod";

export const formLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, {
      message: "Vui lòng nhập Email",
    })
    .pipe(
      z.email({
        message: "Email không đúng định dạng",
      }),
    ),
  password: z
    .string()
    .trim()
    .min(1, {
      message: "Vui lòng nhập mật khẩu",
    })
    .min(8, {
      message: "Mật khẩu có ít nhất 8 kí tự",
    }),
});
