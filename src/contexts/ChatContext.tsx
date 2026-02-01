import { createContext } from "react";
import type { conversationType } from "../stores/chatStore";

interface ChatContextType {
  conversation: conversationType;
}

export const ChatContext = createContext<ChatContextType | null>(null);
