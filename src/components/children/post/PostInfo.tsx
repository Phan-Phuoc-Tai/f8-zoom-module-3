import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import { use, useEffect, useState } from "react";
import { PostsContext } from "../../../contexts/PostsContext";
import { usePostStore } from "../../../stores/postStore";
import { Button } from "../../ui/button";
import { useAuthStore } from "../../../stores/authStore";
import { cn } from "../../../lib/utils";
import { PostDetail } from "./PostDetail";

export default function PostInfo() {
  const context = use(PostsContext);
  const post = context?.post;
  const caption = post?.caption;
  const comments = post?.comments;
  const userId = post?.userId;
  const likedBy = post?.likedBy;
  const savedBy = post?.savedBy;
  const postId = post?._id;
  const likes = post?.likes;
  const isLiked = post?.isLiked;
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const { likePost, unLikePost, savePost, unSavePost, fetchNewsFeed } =
    usePostStore();
  const { user } = useAuthStore();

  const handleToggleLike = async () => {
    if (postId) {
      if (!liked) {
        likePost(postId)
          .then(() => fetchNewsFeed())
          .then(() => setLiked(true));

        return;
      }
      unLikePost(postId)
        .then(() => fetchNewsFeed())
        .then(() => setLiked(false));
      return;
    }
  };
  const handleToggleSave = async () => {
    if (postId && setSaved) {
      if (!saved) {
        savePost(postId)
          .then(() => fetchNewsFeed())
          .then(() => setSaved(true));
        return;
      }
      unSavePost(postId)
        .then(() => fetchNewsFeed())
        .then(() => setSaved(false));
      return;
    }
  };
  const handleOpenPostDetail = () => {
    setOpen(!isOpen);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLiked) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }, 0);
    likedBy?.map((idUser) => {
      if (idUser === user?._id) {
        setLiked(true);
      }
    });
    savedBy?.map((idUser) => {
      if (idUser === user?._id) {
        setSaved(true);
      }
    });
    return () => {
      clearTimeout(timeout);
    };
  }, [likedBy, savedBy]);
  return (
    <div>
      {/* Action */}
      <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-3">
          <div className="like flex items-center gap-1">
            <Button
              size={null}
              variant={"outline"}
              className=" border-0 outline-none cursor-pointer shadow-none hover:bg-transparent hover:text-red-500 hover:scale-105 active:scale-90"
              onClick={handleToggleLike}
            >
              <Heart
                className={cn("", liked && "fill-red-500 text-red-500")}
                style={{ width: 24, height: 24 }}
              />
            </Button>
            <p className="font-medium">{likes}</p>
          </div>

          <div className="comment flex items-center gap-1">
            <Button
              size={null}
              variant={"outline"}
              className=" border-0 outline-none cursor-pointer shadow-none hover:bg-transparent hover:scale-105 active:scale-90"
              onClick={handleOpenPostDetail}
            >
              <MessageCircle style={{ width: 24, height: 24 }} />
            </Button>
            <p className="font-medium">{comments && Math.abs(comments)}</p>
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

      <div className="flex items-center gap-1.5 text-[#0c1014] text-sm">
        <h3 className="font-semibold">{userId?.username}</h3>
        <p className="font-normal">{caption}</p>
      </div>
      {isOpen && setOpen && <PostDetail postId={postId} setOpen={setOpen} />}
    </div>
  );
}
