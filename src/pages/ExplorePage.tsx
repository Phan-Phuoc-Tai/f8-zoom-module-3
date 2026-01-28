import { useQuery } from "@tanstack/react-query";
import { usePostStore } from "../stores/postStore";
import { PostsContext } from "../contexts/PostsContext";
import LoadingPost from "../tools/LoadingPost";
import ExploreCard from "../components/parent/ExploreCard";
import { toast } from "sonner";
import { ExploreCache } from "../cache/Cache";

export default function ExplorePage() {
  const { fetchExplore } = usePostStore();
  const {
    data: explores,
    isLoading,
    error,
  } = useQuery({
    queryKey: ExploreCache.list,
    queryFn: fetchExplore,
    retry: 2,
  });
  if (error) {
    toast.error(error.message);
  }
  return (
    <main className="flex justify-center w-full pt-12">
      <div className="max-w-[963px] h-full w-full grid grid-cols-3 gap-1">
        {isLoading &&
          Array.from({ length: 9 }).map((_, index) => (
            <LoadingPost key={index} />
          ))}
        {explores?.map((post, index) => (
          <div key={index} className="w-max">
            <PostsContext.Provider value={post}>
              <ExploreCard />
            </PostsContext.Provider>
          </div>
        ))}
      </div>
    </main>
  );
}
