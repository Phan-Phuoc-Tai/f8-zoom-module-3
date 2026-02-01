import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Spinner } from "../components/ui/spinner";
import { useAuthStore, type FormDataType } from "../stores/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { formForgotPasswordSchema } from "../schemas/formLoginSchema";
import { cn } from "../lib/utils";
import { NavLink } from "react-router-dom";

export default function ForgotPasswordPage() {
  const { handleSendEmailReset, isLoading, isSended } = useAuthStore();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(formForgotPasswordSchema),
    mode: "onChange",
  });
  const onSubmit = (data: FormDataType) => {
    if (handleSendEmailReset && data.email) {
      handleSendEmailReset(data.email);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white border border-black/10 shadow-md p-10 rounded-lg">
        <div className="flex items-center justify-center h-20">
          <img src="/images/ins-logo.svg" className="object-cover" />
        </div>
        <div>
          {isSended ? (
            <p className="text-green-500 text-lg py-3">
              Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư 📧
            </p>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex items-center justify-center flex-col gap-3 w-95"
            >
              <h1 className="mb-3 text-3xl font-semibold">Quên mật khẩu</h1>
              <input
                type="email"
                placeholder="Email..."
                className={cn(
                  "text-base p-3 w-full border border-black/30 rounded-md h-auto focus-visible:ring-0 outline-none focus-visible:border-blue-700 ",
                  errors?.email?.message &&
                    "border-red-500 focus-visible:border-red-500",
                )}
                {...register("email")}
              />
              {errors?.email?.message && (
                <p className=" text-red-500 text-sm">{errors.email.message}</p>
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
                    <span>Đang gửi đến email reset...</span>
                  </>
                ) : (
                  "Gửi email reset"
                )}
              </Button>
            </form>
          )}

          <NavLink
            to={"/login"}
            className={"block mt-4 text-blue-600 text-center hover:underline "}
          >
            Quay lại đăng nhập
          </NavLink>
        </div>
      </div>
    </div>
  );
}
