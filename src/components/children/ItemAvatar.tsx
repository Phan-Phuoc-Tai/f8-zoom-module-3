import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../ui/item";
import { Button } from "../ui/button";
import { Ellipsis } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { PostsContext } from "../../contexts/PostsContext";
import { use } from "react";

export function ItemAvatar() {
  const context = use(PostsContext);
  const userId = context?.userId;
  return (
    <div className="flex w-full flex-col gap-6">
      <Item className="gap-3 p-0 pr-[10px] pl-[14px] pb-3">
        <ItemMedia>
          <Avatar className="size-10 rounded-full overflow-hidden">
            <AvatarImage src="https://github.com/evilrabbit.png" />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent className="flex-row">
          <ItemTitle>{userId?.username}</ItemTitle>
          <span className="text-[#737373]">&bull;</span>
          <ItemDescription>1 ngày</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button
            size="icon-lg"
            variant="outline"
            className="rounded-full border-0 outline-none shadow-none"
          >
            <Ellipsis />
          </Button>
        </ItemActions>
      </Item>
    </div>
  );
}
