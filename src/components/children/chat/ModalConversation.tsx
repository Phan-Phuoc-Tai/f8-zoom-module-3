import {
  useRef,
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

import { useUserStore, type profileUserType } from "../../../stores/userStore";
import { useChatStore, type ConversationType } from "../../../stores/chatStore";
import { ChatsCache } from "../../../cache/Cache";
import { useQueryClient } from "@tanstack/react-query";
import LoadingSearchUser from "../../../tools/LoadingSearchUser";
export default function ModalConversation({
  setOpenModal,
}: {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();
  const { searchUser, isLoading } = useUserStore();
  const {
    getConversations,
    createOrGetConversation,
    getIdConversationActive,
    getMessageInConversation,
  } = useChatStore();
  const [keyword, setKeyword] = useState("");
  const searchTimeout = useRef<number | null>(null);
  const [searchUsers, setSearchUsers] = useState<profileUserType[]>([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const handleSearchUser = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchUsers([]);
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    if (value) {
      searchTimeout.current = setTimeout(() => {
        searchUser(value).then((data) => setSearchUsers(data));
      }, 500);
    }
    setKeyword(value);
  };

  return (
    <Dialog defaultOpen={true} onOpenChange={setOpenModal}>
      <DialogContent className="bg-[#eee] border-none outline-none p-0 max-w-137 min-h-105 w-full flex flex-col gap-0 overflow-hidden">
        <DialogHeader className="items-center border-b border-white p-4 h-14">
          <DialogTitle>Tin nhắn mới</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="px-4 py-3 flex items-center gap-4 border-b border-white">
          <label htmlFor="">Tới:</label>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full outline-none bg-transparent text-sm"
            checked={false}
            value={keyword}
            onChange={handleSearchUser}
          />
        </div>
        <div className=" py-3 max-h-87 h-full overflow-y-auto">
          <h4 className="px-4 mb-3">Gợi ý</h4>
          {isLoading &&
            Array.from({ length: 4 }).map((_, index) => (
              <LoadingSearchUser key={index} />
            ))}
          {searchUsers &&
            searchUsers.map((searchUser, index) => (
              <div
                className="px-4 py-2 flex items-center gap-3 hover:bg-white cursor-pointer"
                key={index}
                onClick={() =>
                  createOrGetConversation(searchUser._id!).then(
                    (conversation) => {
                      queryClient.setQueryData(
                        ChatsCache.conversations,
                        (oldData: ConversationType[]) => {
                          if (
                            oldData.find(
                              (item) => item._id === conversation._id,
                            )
                          ) {
                            return [...oldData];
                          }
                          return [conversation, ...oldData];
                        },
                      );
                      getConversations();
                      getIdConversationActive(conversation._id!);
                      getMessageInConversation(conversation._id!);
                      setOpenModal(false);
                    },
                  )
                }
              >
                <Avatar className="size-11 flex items-center justify-center bg-gray-500 rounded-full overflow-hidden">
                  {searchUser.profilePicture! && (
                    <AvatarImage
                      src={`${baseUrl}${searchUser.profilePicture}`}
                      className="object-cover w-full h-full"
                    />
                  )}

                  <AvatarFallback className="font-medium text-black/80">
                    {searchUser.username &&
                      searchUser.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium truncate">
                    {searchUser.username}
                  </p>
                  <p className="text-sm text-black/70  truncate">
                    {searchUser.fullName}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
