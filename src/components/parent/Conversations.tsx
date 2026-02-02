import { ChatContext } from "../../contexts/ChatContext";
import { useChatStore } from "../../stores/chatStore";
import Conversation from "../children/chat/Conversation";

export default function Conversations() {
  const { conversations } = useChatStore();
  return (
    <>
      {conversations.map((conversation, index) => (
        <ChatContext.Provider
          key={index}
          value={{
            conversation,
          }}
        >
          <Conversation />
        </ChatContext.Provider>
      ))}
    </>
  );
}
