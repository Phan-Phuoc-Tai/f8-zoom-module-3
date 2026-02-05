import { useQuery } from "@tanstack/react-query";
import { ChatsCache } from "../../cache/Cache";
import { ChatContext } from "../../contexts/ChatContext";
import { useChatStore, type ConversationType } from "../../stores/chatStore";
import Conversation from "../children/chat/Conversation";

export default function Conversations() {
  const { getConversations } = useChatStore();
  const { data: conversations } = useQuery<ConversationType[]>({
    queryKey: ChatsCache.conversations,
    queryFn: getConversations,
  });

  return (
    <div className="overflow-y-auto max-h-192">
      {conversations &&
        conversations.map((conversation, index) => (
          <ChatContext.Provider
            key={index}
            value={{
              conversation,
            }}
          >
            <Conversation />
          </ChatContext.Provider>
        ))}
    </div>
  );
}
