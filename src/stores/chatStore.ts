import { create } from "zustand";
import { HTTP } from "../tools/HTTP";
import axios from "axios";
import { toast } from "sonner";

interface ChatRoot {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface MessageType extends ChatRoot {
  conversationId: string;
  senderId?: participantType;
  recipientId: string;
  messageType: string;
  imageUrl?: string;
  content?: string;
  isRead?: boolean;
}
export interface participantType {
  _id: string;
  username: string;
  fullName: string;
  profilePicture: string | null;
}

export interface ConversationType extends ChatRoot {
  participants: participantType[];
  lastMessageAt: string;
  lastMessage: {
    _id: string;
    senderId: string;
    messageType: string;
    content: string;
    isRead: boolean;
    createdAt: string;
  };
  unreadCount: number;
}

interface ChatType {
  isLoading: boolean;
  conversations: ConversationType[];
  messages: MessageType[];
  IdConversationActive: string;
  getConversations: () => Promise<ConversationType[]>;
  getMessageInConversation: (conversationId: string) => Promise<MessageType[]>;
  sendTextMessage: (msgData: MessageType) => Promise<MessageType>;
  sendImageMessage: (file: File, msgData: MessageType) => Promise<MessageType>;
  getIdConversationActive: (conversationId: string) => void;
  createOrGetConversation: (userId: string) => Promise<ConversationType>;
}

export const useChatStore = create<ChatType>()((set) => ({
  isLoading: false,
  conversations: [],
  messages: [],
  IdConversationActive: "",
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
  getMessageInConversation: async (conversationId: string) => {
    try {
      set({ isLoading: true });
      const response = await HTTP.get(
        `/api/messages/conversations/${conversationId}/messages`,
      ).catch((error) => {
        throw error;
      });
      const data = response.data.data;
      set({
        messages: data.messages,
      });
      return data.messages;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    } finally {
      set({ isLoading: false });
    }
  },

  sendTextMessage: async (msgData: MessageType) => {
    try {
      set({ isLoading: true });
      const response = await HTTP.post(`/api/messages/messages`, {
        ...msgData,
      }).catch((error) => {
        throw error;
      });
      const data = response.data.data;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    } finally {
      set({ isLoading: false });
    }
  },

  sendImageMessage: async (file: File, msgData: MessageType) => {
    try {
      set({ isLoading: true });
      const formData = new FormData();

      if (msgData.conversationId) {
        formData.append("conversationId", msgData.conversationId);
      }
      if (msgData.recipientId) {
        formData.append("recipientId", msgData.recipientId);
      }
      if (msgData.messageType === "image") {
        formData.append("messageType", msgData.messageType);
      }

      formData.append("image", file);

      const response = await HTTP.post(`/api/messages/messages`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).catch((error) => {
        throw error;
      });
      const data = response.data;
      return data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    } finally {
      set({ isLoading: false });
    }
  },
  getIdConversationActive: (conversationId) => {
    return set({
      IdConversationActive: conversationId,
    });
  },
  createOrGetConversation: async (userId) => {
    try {
      set({
        isLoading: true,
      });
      const response = await HTTP.post(`/api/messages/conversations`, {
        userId,
      }).catch((error) => {
        throw error;
      });
      const data = response.data.data;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    } finally {
      set({
        isLoading: false,
      });
    }
  },
}));
