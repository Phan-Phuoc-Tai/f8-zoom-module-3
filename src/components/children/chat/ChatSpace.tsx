import { useChatStore } from "../../../stores/chatStore";
import ChatInfo from "./ChatInfo";
import { ChatContext } from "../../../contexts/ChatContext";
import Message from "./Message";
import { formatTimeMessage } from "../../../tools/formatTime";
import SendMessage from "./SendMessage";

export default function ChatSpace() {
  const { messages } = useChatStore();
  return (
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
      </div>
      <SendMessage />
    </div>
  );
}
