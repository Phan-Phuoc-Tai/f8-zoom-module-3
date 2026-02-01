import { use, useState } from "react";
import { Clapperboard, Images } from "lucide-react";
import { UserContext } from "../../../contexts/UserContext";
import { PostDetail } from "../post/PostDetail";

export function PostUser() {
  const context = use(UserContext);
  const image = context?.post?.image;
  const video = context?.post?.video;
  const baseURL = import.meta.env.VITE_BASE_URL;
  const postId = context?.post?._id;
  const [isOpen, setOpen] = useState(false);

  return (
    <article>
      <div
        onClick={() => setOpen(true)}
        className="max-w-69 max-h-69 aspect-square relative transition duration-500 hover:outline-2 hover:outline-black/70 cursor-pointer"
      >
        {image && (
          <>
            <img
              src={`${baseURL}${image}`}
              className="w-full h-full object-cover"
            ></img>
            <div className="absolute top-2 right-2 text-shadow-black text-white ">
              <Images />
            </div>
          </>
        )}
        {video && (
          <>
            <video
              src={`${baseURL}${video}`}
              muted
              className="w-full h-full object-cover"
            ></video>
            <div className="absolute top-2 right-2 text-shadow-black text-white">
              <Clapperboard />
            </div>
          </>
        )}
      </div>
      {isOpen && setOpen && <PostDetail postId={postId} setOpen={setOpen} />}
    </article>
  );
}
