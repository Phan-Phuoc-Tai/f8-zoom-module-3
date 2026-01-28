import { use } from "react";
import { PostsContext } from "../../contexts/PostsContext";

export function ExploreItem() {
  const context = use(PostsContext);
  const image = context?.post?.image;
  const video = context?.post?.video;
  const API_URL = "https://instagram.f8team.dev";

  return (
    <div className="max-w-80 max-h-80 aspect-square">
      {image && (
        <img
          src={`${API_URL}${image}`}
          className="w-full h-full object-cover shadow-md"
        ></img>
      )}
      {video && (
        <video
          src={`${API_URL}${video}`}
          autoPlay
          loop
          muted
          className="w-full h-full object-cover shadow-md"
        ></video>
      )}
    </div>
  );
}
