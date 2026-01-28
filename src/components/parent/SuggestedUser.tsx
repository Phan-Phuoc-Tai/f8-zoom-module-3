import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../../stores/userStore";
import { SuggestedUsersCache } from "../../cache/Cache";
import { toast } from "sonner";
import ItemUser from "../children/user/ItemUser";
import { UserContext } from "../../contexts/UserContext";
import Copyright from "../children/footer/Copyright";
import { useAuthStore } from "../../stores/authStore";
import LoadingItemUser from "../../tools/LoadingItemUser";

export default function SuggestedUser() {
  const { fetchSuggestedUser } = useUserStore();
  const { user } = useAuthStore();
  const {
    data: suggestedUsers,
    isLoading,
    error,
  } = useQuery({
    queryKey: SuggestedUsersCache.list,
    queryFn: fetchSuggestedUser,
    retry: 2,
  });
  if (error) {
    toast.error(error.message);
  }
  return (
    <div>
      <div className="w-[315px]">
        {isLoading ? (
          <LoadingItemUser />
        ) : (
          <UserContext.Provider
            value={{
              user,
            }}
          >
            <ItemUser />
          </UserContext.Provider>
        )}

        <div className="flex items-center justify-between mt-6 mb-4 text-sm font-medium">
          <h4>Gợi ý cho bạn</h4>
          <p className="cursor-pointer">Xem tất cả</p>
        </div>
        {isLoading &&
          Array.from({ length: 5 }).map((_, index) => (
            <LoadingItemUser key={index} />
          ))}
        {suggestedUsers?.map((suggestedUser, index) => (
          <UserContext.Provider
            value={{
              suggestedUser,
            }}
            key={index}
          >
            <ItemUser />
          </UserContext.Provider>
        ))}
        <div className="text-black/60">
          <Copyright />
        </div>
      </div>
    </div>
  );
}
