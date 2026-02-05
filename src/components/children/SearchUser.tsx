import {
  useRef,
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  useUserStore,
  type HistorySearchUser,
  type profileUserType,
} from "../../stores/userStore";
import LoadingSearchUser from "../../tools/LoadingSearchUser";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { HistorySearchUserCache } from "../../cache/Cache";
import { useNavigate } from "react-router-dom";

export default function SearchUser({
  setOpenSearch,
}: {
  setOpenSearch: Dispatch<SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();
  const {
    searchUser,
    clearAllSearchHistory,
    isLoadingSearch,
    addSearchHistory,
    getSearchHistory,
    deleteSearchHistory,
  } = useUserStore();
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
  const navigate = useNavigate();
  const { data: historysSearch } = useQuery({
    queryKey: HistorySearchUserCache.list,
    queryFn: getSearchHistory,
  });
  const handleClearAllHistory = async () => {
    await clearAllSearchHistory();
    queryClient.setQueryData(HistorySearchUserCache.list, () => {
      return [];
    });
  };
  return (
    <div className="fixed inset-0 left-50 z-100">
      <div className="absolute inset-0 w-100 z-80 bg-white">
        <div className="px-5 py-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-[#353535]">Tìm kiếm</h2>
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            checked={false}
            className=" px-4 py-2 outline-none bg-[#ebebeb] w-full rounded-full"
            onChange={handleSearchUser}
            value={keyword}
          />
        </div>

        {!keyword && (
          <div className="flex items-center justify-between px-5 pb-3">
            <p className="font-semibold text-[#353535]">Mới đây</p>
            <button
              onClick={handleClearAllHistory}
              className="outline-none text-blue-500 hover:text-blue-600 hover:underline cursor-pointer"
            >
              Xoá tất cả
            </button>
          </div>
        )}
        {isLoadingSearch &&
          Array.from({ length: 6 }).map((_, index) => (
            <LoadingSearchUser key={index} />
          ))}
        <div className="pb-3 max-h-207 h-full overflow-y-auto">
          {searchUsers &&
            searchUsers.map((searchUser, index) => (
              <div
                className="px-5 py-2 flex items-center gap-3 hover:bg-black/10 cursor-pointer"
                key={index}
                onClick={() => {
                  addSearchHistory(searchUser._id!, keyword);
                  navigate(`/user/${searchUser._id!}`);
                  setOpenSearch(false);
                }}
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

          {historysSearch &&
            !keyword &&
            historysSearch.map((searchUser, index) => (
              <div
                className="px-5 py-2 flex items-center gap-3 hover:bg-black/10 cursor-pointer"
                key={index}
                onClick={() => {
                  navigate(`/user/${searchUser.searchedUserId._id!}`);
                  setOpenSearch(false);
                }}
              >
                <Avatar className="size-11 flex items-center justify-center bg-gray-500 rounded-full overflow-hidden">
                  {searchUser.searchedUserId.profilePicture! && (
                    <AvatarImage
                      src={`${baseUrl}${searchUser.searchedUserId.profilePicture}`}
                      className="object-cover w-full h-full"
                    />
                  )}

                  <AvatarFallback className="font-medium text-black/80">
                    {searchUser.searchedUserId.username &&
                      searchUser.searchedUserId.username
                        .charAt(0)
                        .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium truncate">
                    {searchUser.searchedUserId.username}
                  </p>
                  <p className="text-sm text-black/70  truncate">
                    {searchUser.searchedUserId.fullName}
                  </p>
                </div>
                <button
                  onClick={() =>
                    deleteSearchHistory(searchUser._id).then(() => {
                      queryClient.setQueryData(
                        HistorySearchUserCache.list,
                        (oldData: HistorySearchUser[]) => {
                          return oldData.filter(
                            (item) => item._id !== searchUser._id,
                          );
                        },
                      );
                    })
                  }
                  className="px-2 text-black/60 hover:text-black cursor-pointer text-2xl"
                >
                  &times;
                </button>
              </div>
            ))}
        </div>
      </div>
      <div
        onClick={() => setOpenSearch(false)}
        className="absolute inset-0 bg-transparent"
      ></div>
    </div>
  );
}
