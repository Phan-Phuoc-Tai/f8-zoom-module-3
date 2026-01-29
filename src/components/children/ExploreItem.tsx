import { use, useState } from "react";
import { PostsContext } from "../../contexts/PostsContext";
import { PostDetail } from "./post/PostDetail";

export function ExploreItem() {
  const context = use(PostsContext);
  const image = context?.post?.image;
  const video = context?.post?.video;
  const baseURL = import.meta.env.VITE_BASE_URL;
  const postId = context?.post?._id;
  const [isOpen, setOpen] = useState(false);
  return (
    <div>
      <div
        onClick={() => setOpen(true)}
        className="max-w-80 max-h-80 aspect-square"
      >
        {image && (
          <img
            src={`${baseURL}${image}`}
            className="w-full h-full object-cover shadow-md"
          ></img>
        )}
        {video && (
          <video
            src={`${baseURL}${video}`}
            autoPlay
            loop
            muted
            className="w-full h-full object-cover shadow-md"
          ></video>
        )}
      </div>
      {isOpen && setOpen && <PostDetail postId={postId} setOpen={setOpen} />}
    </div>
  );
}
