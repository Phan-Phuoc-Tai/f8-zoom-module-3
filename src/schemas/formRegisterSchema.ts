import { z } from "zod";

export const formRegisterSchema = z
  .object({
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
    username: z.string().trim().min(1, {
      message: "Vui lòng nhập Username",
    }),
    fullName: z.string().trim().min(1, {
      message: "Vui lòng nhập họ và tên",
    }),
    password: z
      .string()
      .trim()
      .min(1, {
        message: "Vui lòng nhập mật khẩu",
      })
      .min(8, {
        message: "Mật khẩu có ít nhất 8 kí tự",
      }),
    confirmPassword: z.string().trim(),
  })
  .superRefine(({ password, confirmPassword }, context) => {
    if (password !== confirmPassword) {
      context.addIssue({
        code: "custom",
        message: "Xác nhận mật khẩu không khớp",
        path: ["confirmPassword"],
      });
    }
  });
