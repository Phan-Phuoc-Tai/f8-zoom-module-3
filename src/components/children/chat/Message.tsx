import { use } from "react";
import { ChatContext } from "../../../contexts/ChatContext";
import { useAuthStore } from "../../../stores/authStore";
import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

export default function Message() {
  const context = use(ChatContext);
  const message = context?.message;
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { user } = useAuthStore();
  const isOwner = message?.senderId?._id === user?._id ? true : false;
  const { senderId, content, messageType, imageUrl } = message!;
  const isImageType = messageType === "image" ? true : false;
  const { profilePicture, username } = senderId! || {
    profilePicture: null,
    username: "Người dùng không tồn tại",
  };
  return (
    <div
      className={cn(
        "flex items-center gap-3  justify-start",
        isOwner && "justify-end gap-0 ",
      )}
    >
      {!isOwner && (
        <Avatar className="size-7 flex items-center justify-center bg-gray-500 rounded-full overflow-hidden">
          {profilePicture! && (
            <AvatarImage
              src={`${baseUrl}${profilePicture}`}
              className="object-cover w-full h-full"
            />
          )}

          <AvatarFallback className="font-medium text-black/80">
            {username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn("w-max px-3 py-2 rounded-full bg-black/20 text-white", {
          "bg-blue-500": isOwner,
          "p-0": isImageType,
        })}
      >
        {isImageType ? (
          <img className="max-w-68 rounded-2xl" src={`${baseUrl}${imageUrl}`} />
        ) : (
          content
        )}
      </div>
    </div>
  );
}
