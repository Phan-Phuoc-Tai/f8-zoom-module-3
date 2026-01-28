import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import { Button } from "../../ui/button";
import { cn } from "../../../lib/utils";
import { useEffect, useState } from "react";
import { usePostStore, type PostDetail } from "../../../stores/postStore";
import { useAuthStore } from "../../../stores/authStore";
import { formatTime } from "../../../tools/formatTime";

interface Props {
  postDetail: PostDetail;
}

export default function PostDetailInfo({ postDetail: post }: Props) {
  const createdAt = post?.createdAt;
  const likedBy = post?.likedBy;
  const savedBy = post?.savedBy;
  const postId = post?._id;
  const [isLiked, setLiked] = useState(post?.isLiked);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(post?.likes);
  const [isOpen, setOpen] = useState(false);
  const { likePost, unLikePost, savePost, unSavePost } = usePostStore();
  const { user } = useAuthStore();

  const handleToggleLike = async () => {
    if (postId && likes && setLikes) {
      if (!isLiked) {
        likePost(postId);
        setLikes(likes + 1);
        setLiked(true);
        return;
      }
      unLikePost(postId);
      setLikes(likes - 1);
      setLiked(false);
      return;
    }
  };
  const handleToggleSave = async () => {
    if (postId && setSaved) {
      if (!saved) {
        savePost(postId);
        setSaved(true);
        return;
      }
      unSavePost(postId);
      setSaved(false);
      return;
    }
  };
  const handleOpenPostDetail = () => {
    setOpen(!isOpen);
  };
  useEffect(() => {
    likedBy?.filter((idUser) => setLiked(idUser === user?._id));
    savedBy?.filter((idUser) => setSaved(idUser === user?._id));
  }, [likedBy, savedBy]);

  return (
    <div className="absolute bottom-16 left-0 right-0 p-4">
      {/* Action */}
      <div className="flex items-center justify-between my-2 ">
        <div className="flex items-center gap-3">
          <div className="like flex items-center gap-1">
            <Button
              size={null}
              variant={"outline"}
              className=" border-0 outline-none cursor-pointer shadow-none hover:bg-transparent hover:text-red-500 hover:scale-105 active:scale-90"
              onClick={handleToggleLike}
            >
              <Heart
                className={cn("", isLiked && "fill-red-500 text-red-500")}
                style={{ width: 24, height: 24 }}
              />
            </Button>
          </div>

          <div className="comment flex items-center">
            <Button
              size={null}
              variant={"outline"}
              className=" border-0 outline-none cursor-pointer shadow-none hover:bg-transparent hover:scale-105 active:scale-90"
              onClick={handleOpenPostDetail}
            >
              <MessageCircle style={{ width: 24, height: 24 }} />
            </Button>
          </div>

          <div className="share flex items-center">
            <Button
              size={null}
              variant={"outline"}
              className=" border-0 outline-none cursor-pointer shadow-none hover:bg-transparent hover:text-black hover:scale-105 active:scale-90"
            >
              <Send style={{ width: 24, height: 24 }} />
            </Button>
          </div>
        </div>

        <div className="save flex items-center">
          <Button
            size={null}
            variant={"outline"}
            className=" border-0 outline-none cursor-pointer shadow-none hover:bg-transparent hover:text-black hover:scale-105 active:scale-90"
            onClick={handleToggleSave}
          >
            <Bookmark
              className={cn("", saved && "fill-black text-black")}
              style={{ width: 24, height: 24 }}
            />
          </Button>
        </div>
      </div>
      {/* info */}

      <div className="flex flex-col gap-1 text-[#0c1014] text-sm">
        {likes && likes >= 0 && (
          <h3 className="font-semibold">{`${likes} lượt thích`}</h3>
        )}
        <p className="font-normal text-black/70 text-sm">
          {createdAt && formatTime(createdAt)}
        </p>
      </div>
    </div>
  );
}
