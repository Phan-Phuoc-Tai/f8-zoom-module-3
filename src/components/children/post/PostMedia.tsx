import { use } from "react";
import { PostsContext } from "../../../contexts/PostsContext";

export function PostMedia() {
  const context = use(PostsContext);
  const image = context?.post?.image;
  const video = context?.post?.video;
  const baseURL = import.meta.env.VITE_BASE_URL;
  return (
    <div>
      {image && (
        <img
          src={`${baseURL}${image}`}
          className="w-full h-full object-fit rounded-md"
        ></img>
      )}
      {video && (
        <video
          src={`${baseURL}${video}`}
          autoPlay
          loop
          muted
          className="w-full h-full object-fit rounded-md"
        ></video>
      )}
    </div>
  );
}
