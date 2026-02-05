import { Image } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../ui/button";
import { cn } from "../../../lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formMsgSchema } from "../../../schemas/formMsgSchema";
import {
  useChatStore,
  type ConversationType,
  type MessageType,
} from "../../../stores/chatStore";
import { Spinner } from "../../ui/spinner";
import { useAuthStore } from "../../../stores/authStore";

import { socket } from "../../../socket/socket";
import { useQueryClient } from "@tanstack/react-query";
import { ChatsCache } from "../../../cache/Cache";
export default function SendMessage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const typingTimeoutRef = useRef<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const { handleSubmit, register } = useForm({
    resolver: zodResolver(formMsgSchema),
    mode: "onChange",
  });
  const {
    isLoading,
    messages,
    IdConversationActive,
    conversations,
    sendImageMessage,
    sendTextMessage,
  } = useChatStore();
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }
    setFile(selectedFile);
  };
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const myFriend = messages.find(
    (message) => message?.senderId?._id !== user?._id,
  );

  const conversationId = myFriend?.conversationId || "";
  const senderId = myFriend?.senderId?._id || "";
  const handleChangeMsg = (e: React.InputEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    socket.emit("typing", {
      conversationId: conversationId,
      recipientId: senderId,
    });
    setMsg(value);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop-typing", {
        conversationId: conversationId,
        recipientId: senderId,
      });
    }, 1000);
  };
  const handleCancelPreview = () => {
    const url = URL.createObjectURL(file!);
    setPreviewUrl(null);
    setFile(null);
    URL.revokeObjectURL(url);
  };
  const onSubmit = (data: { msg: string }) => {
    if (senderId) {
      const msgData = {
        conversationId: conversationId,
        recipientId: senderId,
        content: data.msg,
      };
      if (file) {
        sendImageMessage(
          file,
          Object.assign(msgData, {
            messageType: "image",
          }),
        ).then((message) => {
          queryClient.setQueryData(
            [...ChatsCache.messages, IdConversationActive],
            (oldData: MessageType[]) => {
              return oldData ? [...oldData, message] : [message];
            },
          );
          queryClient.setQueryData(
            ChatsCache.conversations,
            (oldData: ConversationType[]) => {
              const conversationIdActive = conversations.find(
                (conversation) => conversation._id === IdConversationActive,
              );
              const lastMessage = conversationIdActive?.lastMessage;
              const unreadCount = conversationIdActive?.unreadCount;
              return oldData?.map((conversation) => {
                if (conversation._id === IdConversationActive) {
                  const result = {
                    ...conversation,
                    lastMessage: {
                      ...lastMessage,
                      content: message.content,
                      createdAt: message.createdAt,
                      senderId: message?.senderId?._id,
                      isRead: message.isRead,
                      messageType: message.messageType,
                    },
                    unreadCount: unreadCount!,
                  };
                  return result;
                }
              });
            },
          );
          setFile(null);
          setPreviewUrl(null);
        });
      }
      if (msg) {
        sendTextMessage(
          Object.assign(msgData, {
            messageType: "text",
          }),
        ).then((message) => {
          queryClient.setQueryData(
            [...ChatsCache.messages, IdConversationActive],
            (oldData: MessageType[]) => {
              return oldData ? [...oldData, message] : [message];
            },
          );
          queryClient.setQueryData(
            ChatsCache.conversations,
            (oldData: ConversationType[]) => {
              const conversationIdActive = conversations.find(
                (conversation) => conversation._id === IdConversationActive,
              );
              const lastMessage = conversationIdActive?.lastMessage;
              const unreadCount = conversationIdActive?.unreadCount;
              return oldData?.map((conversation) => {
                if (conversation._id === IdConversationActive) {
                  const result = {
                    ...conversation,
                    lastMessage: {
                      ...lastMessage,
                      content: message.content,
                      createdAt: message.createdAt,
                      senderId: message?.senderId?._id,
                      isRead: message.isRead,
                      messageType: message.messageType,
                    },
                    unreadCount: unreadCount!,
                  };
                  return result;
                }
              });
            },
          );
          setMsg("");
        });
      }
    }
  };
  useEffect(() => {
    if (!file) {
      const timeout = setTimeout(() => {
        if (setPreviewUrl) {
          setPreviewUrl(null);
        }
      }, 0);
      return () => clearTimeout(timeout);
    }
    const url = URL.createObjectURL(file);
    const timeout = setTimeout(() => {
      if (setPreviewUrl) {
        setPreviewUrl(url);
      }
    }, 0);
    return () => {
      clearTimeout(timeout);
      URL.revokeObjectURL(url);
    };
  }, [file]);

  return (
    <div
      className={cn(
        "px-4 py-3 flex items-center justify-between gap-3 fixed bottom-12 left-115 right-0 ",
        previewUrl && "bottom-0",
      )}
    >
      <label
        htmlFor="messageImage"
        className="w-9 h-9 flex items-center justify-center rounded-full bg-cyan-400 text-white/80 cursor-pointer"
      >
        <Image />
      </label>

      <div className=" w-full px-3 py-2 rounded-2xl border border-[#ddd]">
        {previewUrl && (
          <div className="my-2 w-32 relative">
            <img
              src={previewUrl}
              className="max-h-full max-w-full object-contain rounded-lg"
            />
            <Button
              size={null}
              className="w-5 h-5 rounded-full absolute -top-2 -right-2 bg-black/60 hover:bg-black/90 cursor-pointer"
              onClick={handleCancelPreview}
            >
              &times;
            </Button>
          </div>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-between"
        >
          <input
            type="file"
            id="messageImage"
            accept="image/*"
            hidden
            onChange={handleChangeFile}
            ref={fileInputRef}
          />
          <input
            type="text"
            className="pl-1 pr-3 w-full outline-none text-[#363636] text-sm"
            value={msg}
            autoComplete="off"
            onInput={handleChangeMsg}
            placeholder="Nhận tin nhắn..."
            {...register("msg")}
          />
          <Button
            size={null}
            disabled={isLoading}
            className="bg-transparent hover:bg-transparent text-blue-500 hover:text-blue-600 cursor-pointer"
          >
            {isLoading ? <Spinner /> : "Gửi"}
          </Button>
        </form>
      </div>
    </div>
  );
}
