import { CarouselPostImage } from "../children/CarouselPostImage";
import { ItemAvatar } from "../children/ItemAvatar";
import PostInfo from "../children/PostInfo";

export default function PostCard() {
  return (
    <article className="w-[470px] pb-4 mb-5">
      <ItemAvatar />
      <CarouselPostImage />
      <PostInfo />
    </article>
  );
}
