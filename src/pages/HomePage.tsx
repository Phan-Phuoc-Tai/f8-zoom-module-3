import { useQuery } from "@tanstack/react-query";
import PostCard from "../components/parent/PostCard";
import { PostsCache } from "../cache/PostsCache";
import { usePostStore } from "../stores/postStore";
import { PostsContext } from "../contexts/PostsContext";
import LoadingPost from "../tools/LoadingPost";
import { toast } from "sonner";

export default function HomePage() {
  const { fetchNewsFeed } = usePostStore();
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: [PostsCache.list],
    queryFn: fetchNewsFeed,
    retry: 2,
  });
  if (error) {
    toast.error(error.message);
  }
  return (
    <main className="flex justify-center w-full pt-12">
      <div className="max-w-[630px] w-full flex flex-col justify-center items-center">
        {isLoading &&
          Array.from({ length: 5 }).map((_, index) => (
            <LoadingPost key={index} />
          ))}
        {posts?.map((post, index) => (
          <div key={index}>
            <PostsContext.Provider value={post}>
              <PostCard />
            </PostsContext.Provider>
          </div>
        ))}
      </div>
    </main>
  );
}
