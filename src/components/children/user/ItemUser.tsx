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
import { NavLink } from "react-router-dom";

export default function ItemUser() {
  const context = use(UserContext);
  const username = context?.user?.username || context?.suggestedUser?.username;
  const fullName = context?.user?.fullName || context?.suggestedUser?.fullName;
  const profilePicture =
    context?.user?.profilePicture || context?.suggestedUser?.profilePicture;
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const userId = context?.user?._id || context?.suggestedUser?._id;

  return (
    <>
      <Item className="p-0 px-4 py-2">
        <ItemMedia>
          <Avatar className="size-10 cursor-pointer">
            <NavLink to={`/user/${userId}`} className={"w-full"}>
              <AvatarImage
                src={profilePicture && `${baseUrl}${profilePicture}`}
                className="object-cover"
              />
              <AvatarFallback className="font-medium text-black/80">
                {username && username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </NavLink>
          </Avatar>
        </ItemMedia>
        <ItemContent className="gap-0">
          <ItemTitle className="cursor-pointer">
            <NavLink to={`/user/${userId}`}>{username && username}</NavLink>
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
