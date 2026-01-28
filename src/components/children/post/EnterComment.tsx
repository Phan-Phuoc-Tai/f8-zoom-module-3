import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../ui/button";
import { useForm } from "react-hook-form";
import { formCommentSchema } from "../../../schemas/formCommentSchema";
import { usePostStore, type FormCommentData } from "../../../stores/postStore";
import { Spinner } from "../../ui/spinner";
import React, { useState } from "react";

type Props = {
  postId: string;
};
export default function EnterComment({ postId }: Props) {
  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(formCommentSchema),
  });
  const { createComment, isLoading, getPostDetail } = usePostStore();
  const [value, setValue] = useState("");
  const handleChangeValue = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  const onSubmit = (data: FormCommentData) => {
    createComment(postId, data.comment, null)
      .then(() => {
        getPostDetail(postId);
      })
      .then(() => {
        setValue("");
      });
  };

  return (
    <div className="absolute bottom-4 left-0 right-0 px-4 pt-2 border-t border-black/10">
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center">
        <input
          type="text"
          placeholder="Bình luận..."
          className="w-full py-2 outline-none"
          value={value}
          onInput={handleChangeValue}
          {...register("comment")}
        />
        {isLoading ? (
          <Button
            variant={"outline"}
            size={null}
            disabled={isLoading}
            className="flex items-center justify-center p-1 border-0 outline-none shadow-none text-blue-600/90 text-base"
          >
            <Spinner />
          </Button>
        ) : (
          <Button
            variant={"outline"}
            size={null}
            disabled={!isValid}
            className="flex items-center justify-center p-1 border-0 outline-none shadow-none text-blue-600/90 hover:bg-transparent hover:text-blue-700 cursor-pointer text-base"
          >
            Đăng
          </Button>
        )}
      </form>
    </div>
  );
}
