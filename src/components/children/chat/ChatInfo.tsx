import { Info, Phone, Video } from "lucide-react";
import { useAuthStore } from "../../../stores/authStore";
import { useChatStore } from "../../../stores/chatStore";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

export default function ChatInfo() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { user } = useAuthStore();
  const { IdConversationActive, conversations } = useChatStore();
  const conversationIdActive = conversations.find(
    (conversation) => conversation._id === IdConversationActive,
  );
  const participants = conversationIdActive?.participants || [];
  const myFriend = participants!.find(
    (participant) => participant?._id !== user?._id,
  );
  const { username, fullName, profilePicture } = myFriend! || {
    profilePicture: null,
    fullName: "Người dùng không tồn tại",
    username: "",
  };

  return (
    <div className="px-4 pt-5 pb-3 flex items-center gap-3 border-b border-[#ddd]">
      <Avatar className="size-11 flex items-center justify-center  rounded-full overflow-hidden">
        {profilePicture! && (
          <AvatarImage
            src={`${baseUrl}${profilePicture}`}
            className="object-cover w-full h-full"
          />
        )}

        <AvatarFallback className="font-medium text-black/80">
          {username
            ? username.charAt(0).toUpperCase()
            : fullName.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium text-[#363636]">{fullName}</p>
        <p className="text-xs text-black/50">{username}</p>
      </div>
      <div className="flex items-center gap-5 ml-auto">
        <Phone />
        <Video />
        <Info />
      </div>
    </div>
  );
}
