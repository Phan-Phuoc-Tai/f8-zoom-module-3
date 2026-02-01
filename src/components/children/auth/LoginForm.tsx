import { Button } from "../../ui/button";
import { Field, FieldGroup, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "../../../lib/utils";
import { use, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useAuthStore, type FormLoginData } from "../../../stores/authStore";
import { Spinner } from "../../ui/spinner";
import { NavLink, useNavigate } from "react-router-dom";
import { formLoginSchema } from "../../../schemas/formLoginSchema";

export default function RegisterForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(formLoginSchema),
    mode: "onChange",
  });
  const navigate = useNavigate();
  const { handleLogin, isLoading, isAuthenticated } = useAuthStore();
  const context = use(AuthContext);
  const triggerRegister = context?.triggerRegister;
  const setTriggerRegister = context?.setTriggerRegister;
  const handleTriggerRegister = () => {
    if (setTriggerRegister) {
      setTriggerRegister(!triggerRegister);
    }
  };
  const onSubmit = (data: FormLoginData) => {
    if (handleLogin) {
      handleLogin(data);
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        navigate("/");
      }, 0);
    }
  }, [isAuthenticated]);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
        <FieldGroup className="gap-4">
          <Field className="gap-2">
            <FieldLabel htmlFor="email" className="text-lg">
              Email
            </FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="Email..."
              className={cn(
                "text-base p-3 h-auto focus-visible:ring-0 outline-none focus-visible:border-blue-700 ",
                errors?.email?.message &&
                  "border-red-500 focus-visible:border-red-500",
              )}
              {...register("email")}
            />
            {errors?.email?.message && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </Field>

          <Field className="gap-2">
            <FieldLabel htmlFor="password" className="text-lg">
              Mật khẩu
            </FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="Mật khẩu..."
              className={cn(
                "text-base p-3 h-auto focus-visible:ring-0 outline-none focus-visible:border-blue-700 ",
                errors?.password?.message &&
                  "border-red-500 focus-visible:border-red-500",
              )}
              {...register("password")}
            />
            {errors?.password?.message && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </Field>

          {isLoading ? (
            <Button
              type="submit"
              size={null}
              disabled={isLoading}
              className="mt-3 bg-blue-600/90 text-base p-2 h-auto hover:bg-blue-700 cursor-pointer"
            >
              <Spinner /> Đang đăng nhập...
            </Button>
          ) : (
            <Button
              type="submit"
              size={null}
              disabled={!isValid}
              className="mt-3 bg-blue-600/90 text-base p-2 h-auto hover:bg-blue-700 cursor-pointer"
            >
              Đăng nhập
            </Button>
          )}
          <div className="w-full">
            <div className="flex items-center gap-4">
              <div className="h-px bg-gray-500 flex-1"></div>
              <p className="test-sm text-gray-600 uppercase">Hoặc</p>
              <div className="h-px bg-gray-500 flex-1"></div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 cursor-pointer">
                <img
                  src="/images/facebook-logo.svg"
                  className="w-10 h-10 object-cover"
                />
                <p className="text-blue-600 font-medium">
                  Đăng nhập bằng facebook
                </p>
              </div>
              <div className="my-8 text-center font-semibold hover:underline cursor-pointer">
                <NavLink to={"/forgot-password"}>Quên mật khẩu?</NavLink>
              </div>
              <div className="text-base text-center">
                <p className="font-medium">
                  Bạn chưa có tài khoản?
                  <span
                    onClick={handleTriggerRegister}
                    className="ml-2 text-blue-600 font-bold cursor-pointer select-none hover:underline"
                  >
                    Đăng ký
                  </span>
                </p>
              </div>
            </div>
          </div>
        </FieldGroup>
      </form>
    </>
  );
}
