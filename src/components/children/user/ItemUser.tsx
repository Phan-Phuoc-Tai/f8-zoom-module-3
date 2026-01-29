import { use } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../../ui/item";
import { UserContext } from "../../../contexts/UserContext";

export default function ItemUser() {
  const context = use(UserContext);
  const username = context?.user?.username || context?.suggestedUser?.username;
  const fullName = context?.user?.fullName || context?.suggestedUser?.fullName;
  const profilePicture =
    context?.user?.profilePicture || context?.suggestedUser?.profilePicture;
  const baseUrl = import.meta.env.VITE_BASE_URL;

  return (
    <>
      <Item className="p-0 px-4 py-2">
        <ItemMedia>
          <Avatar className="size-10 cursor-pointer">
            <AvatarImage
              src={profilePicture && `${baseUrl}${profilePicture}`}
              className="object-cover"
            />
            <AvatarFallback className="font-medium text-black/80">
              {username && username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent className="gap-0">
          <ItemTitle className="cursor-pointer">
            {username && username}
          </ItemTitle>
          <ItemDescription className="text-xs">
            {context?.suggestedUser?.fullName ? `Gợi ý cho bạn` : fullName}
          </ItemDescription>
        </ItemContent>
        {context?.suggestedUser?.username && (
          <ItemContent className="gap-0 text-blue-600/90 hover:text-blue-700 cursor-pointer">
            <ItemTitle className="text-xs">Theo dõi</ItemTitle>
          </ItemContent>
        )}
      </Item>
    </>
  );
}
