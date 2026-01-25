import { useQuery } from "@tanstack/react-query";
import PostCard from "../components/parent/PostCard";
import { PostsCache } from "../cache/PostsCache";
import { usePostStore } from "../stores/postStore";
import { PostsContext } from "../contexts/PostsContext";
import LoadingPost from "../tools/LoadingPost";

export default function HomePage() {
  const { fetchNewsFeed } = usePostStore();
  const { data: posts, isLoading } = useQuery({
    queryKey: [PostsCache.list],
    queryFn: fetchNewsFeed,
  });
  return (
    <main className="flex justify-center w-full">
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
