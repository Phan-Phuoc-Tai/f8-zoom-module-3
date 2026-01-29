import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "../ui/item";
import { Button } from "../ui/button";
import { Ellipsis } from "lucide-react";
import { PostsContext } from "../../contexts/PostsContext";
import { use, useState } from "react";
import { formatTime } from "../../tools/formatTime";
import PostAction from "./post/PostAction";

export function ItemAvatar() {
  const context = use(PostsContext);
  const userId = context?.post?.userId;
  const createdAt = context?.post?.createdAt;
  const postId = context?.post?._id;
  const caption = context?.post?.caption;
  const [openModalAction, setOpenModalAction] = useState(false);
  return (
    <div className="flex w-full flex-col gap-6">
      <Item className="gap-3 p-0 pr-[10px] pl-[14px] pb-3">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-black font-medium">
          <span>{userId?.username.charAt(0).toUpperCase()}</span>
        </div>

        <ItemContent className="flex-row">
          <ItemTitle>
            {userId?.username ? userId?.username : "Tài khoản đã bị xoá"}
          </ItemTitle>
          <span className="text-[#737373]">&bull;</span>
          <ItemDescription>
            {createdAt && formatTime(createdAt)}
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button
            size="icon-lg"
            variant="outline"
            className="rounded-full border-0 outline-none shadow-none cursor-pointer"
            onClick={() => setOpenModalAction(true)}
          >
            <Ellipsis />
          </Button>
        </ItemActions>
      </Item>
      {openModalAction && (
        <PostsContext.Provider
          value={{
            userId,
            postId,
            caption,
            setOpenModalAction,
          }}
        >
          <PostAction />
        </PostsContext.Provider>
      )}
    </div>
  );
}
