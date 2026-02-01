import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Spinner } from "../components/ui/spinner";
import { useAuthStore, type FormResetData } from "../stores/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { formResetPasswordSchema } from "../schemas/formLoginSchema";
import { cn } from "../lib/utils";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function ForgotPassTokenPage() {
  const { handleResetPassword, isLoading, isResetSuccess } = useAuthStore();
  const { token } = useParams();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(formResetPasswordSchema),
    mode: "onChange",
  });
  const onSubmit = (data: FormResetData) => {
    if (handleResetPassword && token) {
      handleResetPassword(data, token);
    }
  };
  useEffect(() => {
    if (isResetSuccess) {
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  }, [isResetSuccess]);
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white border border-black/10 shadow-md p-10 rounded-lg">
        <div className="flex items-center justify-center h-20">
          <img src="/images/ins-logo.svg" className="object-cover" />
        </div>
        <div>
          {isResetSuccess ? (
            <p className="text-green-500 text-lg py-3">
              Đặt lại mật khẩu thành công 🎉. Đang chuyển đến trang đăng nhập
            </p>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex items-center justify-center flex-col gap-3 w-95"
            >
              <h1 className="mb-3 text-3xl font-semibold">Quên mật khẩu</h1>
              <input
                type="password"
                placeholder="Mật khẩu..."
                className={cn(
                  "text-base p-3 w-full border border-black/30 rounded-md h-auto focus-visible:ring-0 outline-none focus-visible:border-blue-700 ",
                  errors?.password?.message &&
                    "border-red-500 focus-visible:border-red-500",
                )}
                {...register("password")}
              />
              {errors?.password?.message && (
                <p className=" text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
              <input
                type="password"
                placeholder="Xác nhận mật khẩu..."
                className={cn(
                  "text-base p-3 w-full border border-black/30 rounded-md h-auto focus-visible:ring-0 outline-none focus-visible:border-blue-700 ",
                  errors?.confirmPassword?.message &&
                    "border-red-500 focus-visible:border-red-500",
                )}
                {...register("confirmPassword")}
              />
              {errors?.confirmPassword?.message && (
                <p className=" text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
              <Button
                type="submit"
                size={null}
                disabled={!isValid || isLoading}
                className="mt-3 bg-blue-600/90 w-full text-base px-4 py-3 h-auto hover:bg-blue-700 cursor-pointer "
              >
                {isLoading ? (
                  <>
                    <Spinner />
                    <span>Đang gửi yêu cầu...</span>
                  </>
                ) : (
                  "Đặt lại mật khẩu"
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
