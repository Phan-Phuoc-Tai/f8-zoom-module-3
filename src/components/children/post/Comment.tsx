import { Ellipsis, Heart } from "lucide-react";
import { Button } from "../../ui/button";
import { formatTime } from "../../../tools/formatTime";
import { useState } from "react";
import CommentAction from "./CommentAction";
import { CommentContext } from "../../../contexts/CommentContext";

type Props = {
  comment: {
    content?: string;
    createdAt?: string;
    likes?: number;
    user?: {
      _id: string;
      username: string;
    };
    _id?: string;
  };
};

export default function Comment({ comment }: Props) {
  const user = comment.user;
  const likes = comment.likes;
  const createdAt = comment.createdAt;
  const content = comment.content;
  const commentId = comment._id;
  const [openModalAction, setOpenModalAction] = useState(false);

  return (
    <div className="flex items-center justify-between gap-3 p-4 overflow-hidden">
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-black font-medium">
        <span>{user?.username.charAt(0).toUpperCase()}</span>
      </div>
      <div className="mr-auto text-sm group">
        <div className="flex items-center gap-2 ">
          <p className="font-medium cursor-pointer">
            {user?.username ? user?.username : "Tài khoản đã bị xoá"}
          </p>
          <p>{content}</p>
        </div>

        <div className="flex items-center gap-2 ">
          <p className="text-black/70">{createdAt && formatTime(createdAt)}</p>
          <p className="text-black/85 hover:text-black cursor-pointer">
            Trả lời
          </p>
          <div
            className="group-hover:flex hidden items-center justify-center cursor-pointer"
            onClick={() => setOpenModalAction(!openModalAction)}
          >
            <Ellipsis className="size-5" />
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <Button
          variant={"outline"}
          size={null}
          className="border-0 shadow-none cursor-pointer hover:scale-105 active:scale-95"
        >
          <Heart />
        </Button>
        {likes && likes > 0 ? <p className="text-xs">{likes}</p> : ""}
      </div>
      {openModalAction && (
        <CommentContext.Provider
          value={{
            user,
            commentId,
            content,
            setOpenModalAction,
          }}
        >
          <CommentAction />
        </CommentContext.Provider>
      )}
    </div>
  );
}
