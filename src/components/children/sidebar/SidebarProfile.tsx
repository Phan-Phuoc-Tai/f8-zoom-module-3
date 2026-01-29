import { useAuthStore } from "../../../stores/authStore";
import { Item, ItemContent, ItemMedia } from "../../ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function SidebarProfile() {
  const { user } = useAuthStore();
  const profilePicture = user?.profilePicture;
  const username = user?.username;
  const baseURL = import.meta.env.VITE_BASE_URL;
  const picture = profilePicture! && `${baseURL}${profilePicture}`;
  return (
    <Item className="p-2 h-12 gap-2 hover:bg-black/10 rounded-md cursor-pointer">
      <ItemMedia>
        <Avatar className="size-6 flex items-center justify-center  bg-black/10 rounded-full">
          <AvatarImage src={picture} className="object-cover" />

          <AvatarFallback className="font-medium text-black/80">
            {username && username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent className="gap-0 text-base">Trang cá nhân</ItemContent>
    </Item>
  );
}
