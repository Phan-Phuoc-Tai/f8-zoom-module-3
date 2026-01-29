import { ItemAvatar } from "../children/ItemAvatar";
import PostInfo from "../children/post/PostInfo";
import { PostMedia } from "../children/post/PostMedia";

export default function PostCard() {
  return (
    <article className="w-[470px] pb-4 mb-5">
      <ItemAvatar />
      <PostMedia />
      <PostInfo />
    </article>
  );
}
