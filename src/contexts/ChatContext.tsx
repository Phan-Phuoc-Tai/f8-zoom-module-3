import { createContext } from "react";
import type { ConversationType, MessageType } from "../stores/chatStore";

interface ChatContextType {
  conversation?: ConversationType;
  message?: MessageType;
}

export const ChatContext = createContext<ChatContextType | null>(null);
