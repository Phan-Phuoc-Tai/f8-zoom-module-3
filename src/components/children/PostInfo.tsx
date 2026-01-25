import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import { Toggle } from "../ui/toggle";
import { HoverCard, HoverCardTrigger } from "../ui/hover-card";
import { HoverCardContent } from "@radix-ui/react-hover-card";
import { use } from "react";
import { PostsContext } from "../../contexts/PostsContext";

export default function PostInfo() {
  const context = use(PostsContext);
  const likes = context?.likes;
  const caption = context?.caption;
  const comments = context?.comments;
  const saveBy = context?.savedBy;
  const userId = context?.userId;
  return (
    <div>
      {/* Action */}
      <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-1">
          <div className="like flex items-center">
            <HoverCard openDelay={1500} closeDelay={400}>
              <HoverCardTrigger asChild>
                <Toggle
                  aria-label="Toggle heart"
                  size="default"
                  variant="outline"
                  className="aria-pressed:text-red-400 border-0 outline-none cursor-pointer shadow-none hover:bg-transparent hover:text-red-400 active:scale-90"
                >
                  <Heart
                    className="group-data-[state=on]/toggle:fill-foreground"
                    style={{ width: 24, height: 24 }}
                  />
                </Toggle>
              </HoverCardTrigger>
              <HoverCardContent side="left">
                <div className="border border-black/50 bg-white p-1 text-sm font-normal">
                  Thích
                </div>
              </HoverCardContent>
            </HoverCard>
            <p className="font-medium">{likes}</p>
          </div>

          <div className="comment flex items-center">
            <HoverCard openDelay={1500} closeDelay={400}>
              <HoverCardTrigger asChild>
                <Toggle
                  aria-label="Toggle messageCircle"
                  size="default"
                  variant="outline"
                  className="border-0 outline-none cursor-pointer shadow-none active:scale-90"
                >
                  <MessageCircle
                    className="group-data-[state=on]/toggle:fill-foreground"
                    style={{ width: 24, height: 24 }}
                  />
                </Toggle>
              </HoverCardTrigger>
              <HoverCardContent side="top">
                <div className="border border-black/50 bg-white p-1 text-sm font-normal">
                  Bình luận
                </div>
              </HoverCardContent>
            </HoverCard>
            <p className="font-medium">{comments}</p>
          </div>

          <div className="share">
            <HoverCard openDelay={1500} closeDelay={400}>
              <HoverCardTrigger asChild>
                <Toggle
                  aria-label="Toggle send"
                  size="default"
                  variant="outline"
                  className="border-0 outline-none cursor-pointer shadow-none active:scale-90"
                >
                  <Send
                    className="group-data-[state=on]/toggle:fill-foreground"
                    style={{ width: 24, height: 24 }}
                  />
                </Toggle>
              </HoverCardTrigger>
              <HoverCardContent side="right">
                <div className="border border-black/50 bg-white p-1 text-sm font-normal">
                  Chia sẻ
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        <div className="save flex items-center">
          <HoverCard openDelay={1500} closeDelay={400}>
            <HoverCardTrigger asChild>
              <Toggle
                aria-label="Toggle bookmark"
                size="default"
                variant="outline"
                className="aria-pressed:text-orange-400 aria-pressed:bg-orange-100 border-0 outline-none cursor-pointer shadow-none hover:bg-orange-100 hover:text-orange-400 active:scale-90"
              >
                <Bookmark
                  className="group-data-[state=on]/toggle:fill-foreground"
                  style={{ width: 24, height: 24 }}
                />
              </Toggle>
            </HoverCardTrigger>
            <HoverCardContent side="right">
              <div className="border border-black/50 bg-white p-1 text-sm font-normal">
                Lưu
              </div>
            </HoverCardContent>
          </HoverCard>
          <p className="font-medium">{saveBy?.length}</p>
        </div>
      </div>
      {/* info */}

      <div className="flex items-center gap-1.5 text-[#0c1014] text-sm">
        <h3 className="font-semibold">{userId?.username}</h3>
        <p className="font-normal">{caption}</p>
      </div>
    </div>
  );
}
