import { create } from "zustand";
import { HTTP } from "../tools/HTTP";
import axios from "axios";
import { toast } from "sonner";

export interface participantType {
  _id: string;
  username: string;
  fullName: string;
  profilePicture: string | null;
}

export interface conversationType {
  _id: string;
  participants: participantType[];
  lastMessageAt: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
  lastMessage: {
    _id: string;
    senderId: string;
    messageType: string;
    content: string;
    isRead: boolean;
    createdAt: string;
  };
  unreadCount: 0;
}

interface ChatType {
  isLoading: boolean;
  conversations: conversationType[];
  getConversations: () => void;
}

export const useChatStore = create<ChatType>()((set) => ({
  isLoading: false,
  conversations: [],
  getConversations: async () => {
    try {
      set({ isLoading: true });
      const response = await HTTP.get(`/api/messages/conversations`).catch(
        (error) => {
          throw error;
        },
      );
      const data = response.data.data;
      set({
        conversations: data.conversations,
      });
      return data.conversations;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));
