import { NavLink, useLocation } from "react-router-dom";
import { useAuthStore } from "../../../stores/authStore";
import { Item, ItemContent, ItemMedia } from "../../ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useUserStore } from "../../../stores/userStore";

export default function SidebarProfile() {
  const { pathname } = useLocation();
  const isOpen = pathname !== "/chat" ? true : false;
  const { user } = useAuthStore();
  const profilePicture = user?.profilePicture;
  const username = user?.username;
  const baseURL = import.meta.env.VITE_BASE_URL;
  const picture = profilePicture! && `${baseURL}${profilePicture}`;
  const { getUserById, getUserPosts } = useUserStore();
  const handleGetUserById = () => {
    if (getUserById && getUserPosts && user?._id) {
      getUserById(user?._id);
      getUserPosts(user?._id);
    }
  };
  return (
    <Item
      className="p-2 h-12 gap-0 hover:bg-black/10 rounded-md cursor-pointer"
      onClick={handleGetUserById}
    >
      <NavLink
        to={`${user?._id && `/user/${user?._id}`}`}
        className="flex items-center gap-2 w-full  "
      >
        <ItemMedia>
          <Avatar className="size-6 flex items-center justify-center  bg-black/10 rounded-full overflow-hidden">
            <AvatarImage src={picture} className="object-cover w-full h-full" />

            <AvatarFallback className="font-medium text-black/80">
              {username && username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </ItemMedia>
        {isOpen && (
          <ItemContent className="gap-0 text-base">Trang cá nhân</ItemContent>
        )}
      </NavLink>
    </Item>
  );
}
