import { MessageCircle, SquarePen } from "lucide-react";
import { Button } from "../components/ui/button";
import { useAuthStore } from "../stores/authStore";
import { useChatStore } from "../stores/chatStore";
import Conversations from "../components/parent/Conversations";
import { useQuery } from "@tanstack/react-query";
import { ChatsCache } from "../cache/Cache";

export default function ChatPage() {
  const { user } = useAuthStore();
  const { isLoading, conversations, getConversations } = useChatStore();
  const { data } = useQuery({
    queryKey: ChatsCache.list,
    queryFn: getConversations,
  });
  return (
    <div className="w-100 border-r border-[#ddd] shadow-2xl ml-3">
      <div className="p-5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-[#353535]">
            {user?.username}
          </h2>
          <Button
            size={null}
            className="bg-white text-black hover:bg-transparent hover:text-black/60 cursor-pointer"
          >
            <SquarePen style={{ width: 24, height: 24 }} />
          </Button>
        </div>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className=" px-4 py-2 outline-none bg-[#ebebeb] w-full rounded-full"
        />
      </div>
      <div className="mb-2 px-6 font-semibold">Tin nhắn</div>
      {!conversations.length ? (
        <div className="flex items-center justify-center flex-col gap-3 py-12">
          <div className=" text-black/20">
            <MessageCircle style={{ width: 40, height: 40 }} />
          </div>
          <p className="text-black/30 font-medium text-sm">
            Bạn chưa có cuộc trò chuyện nào
          </p>
          <p className="font-medium text-blue-500 text-sm cursor-pointer hover:underline">
            Bắt đầu trò chuyện
          </p>
        </div>
      ) : (
        <Conversations />
      )}
    </div>
  );
}
