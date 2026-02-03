import { use } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { ChatContext } from "../../../contexts/ChatContext";
import { useAuthStore } from "../../../stores/authStore";
import { useChatStore, type participantType } from "../../../stores/chatStore";
import { formatTimeChat } from "../../../tools/formatTime";

export default function Conversation() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const context = use(ChatContext);
  const conversation = context?.conversation;
  const { lastMessage, unreadCount, _id: conversationId } = conversation!;
  const { user } = useAuthStore();
  const myFriend = conversation!.participants.filter(
    (participant: participantType) => participant._id !== user?._id,
  );
  const isMyLastMessage = lastMessage.senderId === user?._id ? true : false;
  const isSendText = lastMessage.messageType === "text" ? true : false;
  const { profilePicture, username } = myFriend[0];
  const { getIdConversationActive } = useChatStore();
  const handleSetConversationId = () => {
    if (getIdConversationActive && conversationId) {
      getIdConversationActive(conversationId);
    }
  };
  return (
    <>
      <div
        onClick={handleSetConversationId}
        className="px-6 py-2.5 flex items-center gap-3 hover:bg-gray-100 cursor-pointer"
      >
        <Avatar className="size-11 flex items-center justify-center bg-gray-500 rounded-full overflow-hidden">
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
        <div className="flex-1">
          <p className="text-sm font-medium truncate">{username}</p>
          <div className="flex gap-1 mt-0.5 text-xs text-[#454555]">
            {isMyLastMessage && <span>Bạn:</span>}
            <span>{`${isSendText ? `${lastMessage.content}` : "Đã gửi 1 hình ảnh"}`}</span>
            <span className="text-black/40">&bull;</span>
            <span>{formatTimeChat(lastMessage.createdAt)}</span>
          </div>
        </div>
        {unreadCount > 0 && (
          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-xs text-white">
            <span>{unreadCount}</span>
          </div>
        )}
      </div>
    </>
  );
}
