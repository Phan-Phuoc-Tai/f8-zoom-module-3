import { MessageCircle, MessageCircleMore, SquarePen } from "lucide-react";
import { Button } from "../components/ui/button";
import { useAuthStore } from "../stores/authStore";
import {
  useChatStore,
  type ConversationType,
  type MessageType,
} from "../stores/chatStore";
import Conversations from "../components/parent/Conversations";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ChatsCache } from "../cache/Cache";
import ChatSpace from "../components/children/chat/ChatSpace";
import { socket } from "../socket/socket";
import { useEffect } from "react";

export default function ChatPage() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const { conversations, IdConversationActive, getConversations } =
    useChatStore();
  const { data } = useQuery({
    queryKey: ChatsCache.conversations,
    queryFn: getConversations,
  });
  useEffect(() => {
    socket.on("new_message", (message) => {
      console.log(message);
      //update messages with new message
      queryClient.setQueryData(
        [...ChatsCache.messages, IdConversationActive],
        (oldData: MessageType[]) => {
          return oldData ? [...oldData, message] : [message];
        },
      );
      //update conversations with new message
      queryClient.setQueryData(
        ChatsCache.conversations,
        (oldData: ConversationType[]) => {
          const conversationIdActive = conversations.find(
            (conversation) => conversation._id === IdConversationActive,
          );
          const lastMessage = conversationIdActive?.lastMessage;
          let unreadCount = conversationIdActive?.unreadCount;
          return oldData?.map((conversation) => {
            if (conversation._id === IdConversationActive) {
              const result = {
                ...conversation,
                lastMessage: {
                  ...lastMessage,
                  content: message.content,
                  createdAt: message.createdAt,
                  senderId: message.senderId._id,
                  isRead: message.isRead,
                  messageType: message.messageType,
                },
                unreadCount: ++unreadCount!,
              };
              return result;
            }
          });
        },
      );
    });

    return () => {
      socket.off("new_message");
    };
  }, [IdConversationActive, queryClient]);
  return (
    <div className="flex w-full">
      <div className="w-100 border-r border-[#ddd] ml-3 shrink-0">
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
      {!IdConversationActive ? (
        <div className="flex items-center justify-center flex-col py-12 w-full">
          <div className=" text-black/20">
            <MessageCircleMore style={{ width: 96, height: 96 }} />
          </div>
          <h2 className="mt-3 text-black/30 font-medium text-xl">
            Tin nhắn của bạn
          </h2>
          <p className="text-black/30 font-medium text-sm">
            Gửi ảnh và tin nhắn riêng tư cho bạn bè hoặc nhóm
          </p>
          <Button className="bg-blue-500 mt-5 font-medium text-white/90 cursor-pointer hover:bg-blue-600 hover:text-white">
            Gửi tin nhắn
          </Button>
        </div>
      ) : (
        <ChatSpace />
      )}
    </div>
  );
}
