import { useAuthStore } from "../../stores/authStore";
import { Item, ItemContent, ItemMedia } from "../ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function SidebarProfile() {
  const { user } = useAuthStore();
  const profilePicture = user?.profilePicture;
  const fullName = user?.fullName;
  const baseUrl = "https://instagram.f8team.dev";

  return (
    <Item className="p-2 h-12 gap-2 hover:bg-black/10 rounded-md cursor-pointer">
      <ItemMedia>
        <Avatar className="size-6 flex items-center justify-center  bg-black/10 rounded-full">
          <AvatarImage
            src={profilePicture ?? `${baseUrl}${profilePicture}`}
            className="object-cover"
          />

          <AvatarFallback className="font-medium text-black/80">
            {fullName && fullName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent className="gap-0 text-base">Trang cá nhân</ItemContent>
    </Item>
  );
}
