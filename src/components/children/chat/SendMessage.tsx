import { Image } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../ui/button";
import { cn } from "../../../lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formMsgSchema } from "../../../schemas/formMsgSchema";
import { useChatStore } from "../../../stores/chatStore";
import { Spinner } from "../../ui/spinner";
import { useAuthStore } from "../../../stores/authStore";

import { socket } from "../../../socket/socket";
export default function SendMessage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
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
    getMessageInConversation,
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
  const myFriend = messages.find(
    (message) => message?.senderId?._id !== user?._id,
  );
  const { conversationId, senderId } = myFriend!;

  const handleChangeMsg = (e: React.InputEvent<HTMLInputElement>) => {
    setMsg(e.currentTarget.value);
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
        recipientId: senderId?._id,
        content: data.msg,
      };
      if (file) {
        sendImageMessage(
          file,
          Object.assign(msgData, {
            messageType: "image",
          }),
        ).then(() => {
          setFile(null);
          setPreviewUrl(null);
        });
      }
      if (msg) {
        sendTextMessage(
          Object.assign(msgData, {
            messageType: "text",
          }),
        ).then(() => {
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
