import { Button } from "../../ui/button";
import { Field, FieldGroup, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "../../../lib/utils";
import { use, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { formRegisterSchema } from "../../../schemas/formRegisterSchema";
import { useAuthStore, type FormRegisterData } from "../../../stores/authStore";
import { Spinner } from "../../ui/spinner";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(formRegisterSchema),
    mode: "onChange",
  });
  const navigate = useNavigate();
  const { handleRegister, isLoading, isRegisterSuccess } = useAuthStore();
  const context = use(AuthContext);
  const triggerRegister = context?.triggerRegister;
  const setTriggerRegister = context?.setTriggerRegister;
  const handleTriggerRegister = () => {
    if (setTriggerRegister) {
      setTriggerRegister(!triggerRegister);
    }
  };
  const onSubmit = (data: FormRegisterData) => {
    if (handleRegister) {
      handleRegister(data);
    }
  };
  useEffect(() => {
    if (isRegisterSuccess) {
      setTimeout(() => {
        navigate("/verify-email");
      }, 0);
    }
  }, [isRegisterSuccess]);
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
            <FieldLabel htmlFor="username" className="text-lg">
              Username
            </FieldLabel>
            <Input
              id="username"
              type="text"
              placeholder="Username..."
              className={cn(
                "text-base p-3 h-auto focus-visible:ring-0 outline-none focus-visible:border-blue-700 ",
                errors?.username?.message &&
                  "border-red-500 focus-visible:border-red-500",
              )}
              {...register("username")}
            />
            {errors?.username?.message && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
          </Field>
          <Field className="gap-2">
            <FieldLabel htmlFor="fullName" className="text-lg">
              Họ và tên
            </FieldLabel>
            <Input
              id="fullName"
              type="text"
              placeholder="Họ và tên..."
              className={cn(
                "text-base p-3 h-auto focus-visible:ring-0 outline-none focus-visible:border-blue-700 ",
                errors?.fullName?.message &&
                  "border-red-500 focus-visible:border-red-500",
              )}
              {...register("fullName")}
            />
            {errors?.fullName?.message && (
              <p className="text-red-500">{errors.fullName.message}</p>
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
          <Field className="gap-2">
            <FieldLabel htmlFor="confirmPassword" className="text-lg">
              Xác nhận mật khẩu
            </FieldLabel>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Xác nhận mật khẩu..."
              className={cn(
                "text-base p-3 h-auto focus-visible:ring-0 outline-none focus-visible:border-blue-700 ",
                errors?.confirmPassword?.message &&
                  "border-red-500 focus-visible:border-red-500",
              )}
              {...register("confirmPassword")}
            />
            {errors?.confirmPassword?.message && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </Field>

          {isLoading ? (
            <Button
              type="submit"
              size={null}
              disabled={isLoading}
              className="mt-3 bg-blue-600/90 text-base p-2 h-auto hover:bg-blue-700 cursor-pointer"
            >
              <Spinner /> Đang đăng ký...
            </Button>
          ) : (
            <Button
              type="submit"
              size={null}
              disabled={!isValid}
              className="mt-3 bg-blue-600/90 text-base p-2 h-auto hover:bg-blue-700 cursor-pointer"
            >
              Đăng ký
            </Button>
          )}
          <div className="w-full">
            <div className="mt-5 text-base text-center">
              <p className="font-medium">
                Bạn đã có tài khoản?
                <span
                  onClick={handleTriggerRegister}
                  className="ml-2 text-blue-600 font-bold cursor-pointer select-none hover:underline"
                >
                  Đăng nhập
                </span>
              </p>
            </div>
          </div>
        </FieldGroup>
      </form>
    </>
  );
}
