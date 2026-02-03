import { useChatStore, type MessageType } from "../../../stores/chatStore";
import ChatInfo from "./ChatInfo";
import { ChatContext } from "../../../contexts/ChatContext";
import Message from "./Message";
import { formatTimeMessage } from "../../../tools/formatTime";
import SendMessage from "./SendMessage";
import { ChatsCache } from "../../../cache/Cache";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { socket } from "../../../socket/socket";
import { useAuthStore } from "../../../stores/authStore";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function ChatSpace() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const { user } = useAuthStore();
  const { IdConversationActive, conversations, getMessageInConversation } =
    useChatStore();
  const conversationIdActive = conversations.find(
    (conversation) => conversation._id === IdConversationActive,
  );
  const participants = conversationIdActive?.participants;
  const myFriend = participants!.find(
    (participant) => participant?._id !== user?._id,
  );
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { username, profilePicture } = myFriend!;
  const { data: messages } = useQuery<MessageType[]>({
    queryKey: [...ChatsCache.messages, IdConversationActive],
    queryFn: async () => getMessageInConversation(IdConversationActive),
  });
  const [typingUsers, setTypingUsers] = useState<
    { conversationId: string; userId: string }[]
  >([]);
  useEffect(() => {
    socket.on(
      "user_typing",
      (data: { conversationId: string; userId: string }) => {
        setTypingUsers((prev) => {
          if (prev.find((u) => u.userId === data.userId)) {
            return prev;
          }
          return [...prev, data];
        });
      },
    );
    socket.on("user_stop_typing", (data: { userId: string }) => {
      setTypingUsers((prev) => prev.filter((u) => u.userId !== data.userId));
    });

    return () => {
      socket.off("user_typing");
      socket.off("user_stop_typing");
    };
  }, []);

  useEffect(() => {
    if (messages && messages!.length > 0) {
      scrollToBottom();
    }
  }, [messages]);
  return (
    <>
      {messages && (
        <div className="w-full max-h-full">
          <ChatInfo />
          <div className="p-4 overflow-y-auto h-190">
            <div className="flex flex-col justify-end min-h-full gap-2">
              {messages.map((message, index) => {
                const prevMsg = messages[index - 1];
                const latest = message?.createdAt;
                const old = prevMsg?.createdAt;
                const isShowTime =
                  !prevMsg ||
                  new Date(latest!).getTime() - new Date(old!).getTime() >
                    5 * 60 * 1000;
                return (
                  <ChatContext.Provider
                    key={index}
                    value={{
                      message,
                    }}
                  >
                    <div>
                      {isShowTime && (
                        <p className="text-center text-black/50">
                          {formatTimeMessage(latest!)}
                        </p>
                      )}
                      <Message />
                    </div>
                  </ChatContext.Provider>
                );
              })}
            </div>
            <div className="flex items-center gap-3 h-7">
              {typingUsers.length > 0 && (
                <>
                  <Avatar className="size-7 flex items-center justify-center bg-muted border rounded-full overflow-hidden">
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
                  <div className="flex ">
                    <p className="animate-bounce">&bull;</p>
                    <p className="animate-bounce delay-150">&bull;</p>
                    <p className="animate-bounce delay-300">&bull;</p>
                  </div>
                </>
              )}
            </div>
            <div ref={scrollRef} />
          </div>
          <SendMessage />
        </div>
      )}
    </>
  );
}
