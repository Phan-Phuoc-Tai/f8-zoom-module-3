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

export const formForgotPasswordSchema = z.object({
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
});

export const formResetPasswordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(1, {
        message: "Vui lòng nhập mật khẩu",
      })
      .min(8, {
        message: "Mật khẩu có ít nhất 8 kí tự",
      })
      .refine((password) => /[A-Z]/.test(password), {
        message: "Mật khẩu phải chứa ít nhất 1 ký tự viết hoa",
      })
      .refine((password) => /[a-z]/.test(password), {
        message: "Mật khẩu phải chứa ít nhất 1 ký tự viết thường",
      })
      .refine((password) => /[0-9]/.test(password), {
        message: "Mật khẩu phải chứa ít nhất 1 chữ số",
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
