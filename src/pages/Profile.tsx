import { Controller, useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Field, FieldGroup, FieldLabel } from "../components/ui/field";
import { Input } from "../components/ui/input";
import { Spinner } from "../components/ui/spinner";
import { cn } from "../lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { formUpdateProfile } from "../schemas/formUpdateProfile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useEffect, useState } from "react";
import { useAuthStore, type FormUpdateProfile } from "../stores/authStore";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

export default function Profile() {
  const { user, handleUpdateProfile, isLoading } = useAuthStore();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(formUpdateProfile),
    mode: "onChange",
  });
  const { fullName, username, profilePicture } = user!;
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const onSubmit = (data: FormUpdateProfile) => {
    if (handleUpdateProfile) {
      handleUpdateProfile(data);
    }
  };

  const handleChangeFile = (e: React.FormEvent<HTMLInputElement>) => {
    const selectedFile = e.currentTarget.files?.[0];
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    setFile(selectedFile);
  };
  useEffect(() => {
    if (!file) {
      const timeout = setTimeout(() => {
        if (setPreviewUrl) {
          setPreviewUrl(null);
        }
      }, 0);
      return () => clearTimeout(timeout);
    }

    const url = URL.createObjectURL(file);
    const timeout = setTimeout(() => {
      if (setPreviewUrl) {
        setPreviewUrl(url);
      }
    }, 0);
    return () => {
      clearTimeout(timeout);
      URL.revokeObjectURL(url);
    };
  }, [file]);
  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || "",
        bio: user.bio || "",
        website: user.website || "",
        gender: user.gender as "male" | "female" | "other" | undefined,
      });
    }
  }, [user, reset]);
  return (
    <main className="flex-1 py-12">
      <div className="max-w-175 mx-auto text-[#353635]">
        <h1 className="mb-5 text-xl ">Chỉnh sửa trang cá nhân</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full px-5 py-6 border border-black/10 rounded-lg shadow"
        >
          <div className="flex items-center justify-center gap-4 p-4 rounded-3xl">
            <Avatar className="size-14 flex items-center justify-center bg-black/10 rounded-full overflow-hidden">
              {previewUrl ? (
                <AvatarImage
                  src={`${previewUrl}`}
                  className="object-cover w-full h-full"
                />
              ) : (
                profilePicture! && (
                  <AvatarImage
                    src={`${baseUrl}${profilePicture}`}
                    className="object-cover w-full h-full"
                  />
                )
              )}

              <AvatarFallback className="font-medium text-black/80">
                {username && username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-[#363636]">
              <h2 className="font-semibold ">{username}</h2>
              <p className="text-sm">{fullName}</p>
            </div>
            <label
              htmlFor="profilePicture"
              className="ml-auto bg-blue-500 p-3 rounded-lg text-white font-medium cursor-pointer hover:bg-blue-600"
            >
              Đổi ảnh
            </label>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              hidden
              onInput={handleChangeFile}
              {...register("profilePicture")}
            />
          </div>

          <FieldGroup className="gap-4">
            <Field className="gap-2">
              <FieldLabel htmlFor="fullName" className="text-lg">
                Họ tên
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
              <FieldLabel htmlFor="bio" className="text-lg">
                Tiểu sử
              </FieldLabel>
              <Input
                id="bio"
                type="text"
                placeholder="Tiểu sử..."
                className={cn(
                  "text-base p-3 h-auto focus-visible:ring-0 outline-none focus-visible:border-blue-700 ",
                  errors?.bio?.message &&
                    "border-red-500 focus-visible:border-red-500",
                )}
                {...register("bio")}
              />
              {errors?.bio?.message && (
                <p className="text-red-500">{errors.bio.message}</p>
              )}
            </Field>
            <Field className="gap-2">
              <FieldLabel htmlFor="website" className="text-lg">
                Website
              </FieldLabel>
              <Input
                id="website"
                type="text"
                placeholder="website..."
                className={cn(
                  "text-base p-3 h-auto focus-visible:ring-0 outline-none focus-visible:border-blue-700 ",
                  errors?.website?.message &&
                    "border-red-500 focus-visible:border-red-500",
                )}
                {...register("website")}
              />
              {errors?.website?.message && (
                <p className="text-red-500">{errors.website.message}</p>
              )}
            </Field>

            <Field className="w-20">
              <FieldLabel htmlFor="gender" className="text-lg">
                Giới tính
              </FieldLabel>
              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <Select
                    key={field.value}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn giới tính" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Nam</SelectItem>
                      <SelectItem value="female">Nữ</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <Button
              type="submit"
              size={null}
              disabled={isLoading}
              className="mt-3 bg-blue-600/90 text-base p-2 h-auto hover:bg-blue-700 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Spinner /> Đang lưu thay đổi...
                </>
              ) : (
                "Lưu thay đổi"
              )}
            </Button>
          </FieldGroup>
        </form>
      </div>
    </main>
  );
}
