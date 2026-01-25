import { useQuery } from "@tanstack/react-query";
import { usePostStore } from "../stores/postStore";
import { PostsContext } from "../contexts/PostsContext";
import LoadingPost from "../tools/LoadingPost";
import { ExploreCache } from "../cache/ExploreCache";
import ExploreCard from "../components/parent/ExploreCard";

export default function ExplorePage() {
  const { fetchExplore } = usePostStore();
  const { data: explores, isLoading } = useQuery({
    queryKey: [ExploreCache.list],
    queryFn: fetchExplore,
  });
  return (
    <main className="flex justify-center w-full pt-12">
      <div className="max-w-[963px] max-h-80 h-full w-full grid grid-cols-3 gap-0.5">
        {isLoading &&
          Array.from({ length: 9 }).map((_, index) => (
            <LoadingPost key={index} />
          ))}
        {explores?.map((explore, index) => (
          <div key={index} className="w-max">
            <PostsContext.Provider value={explore}>
              <ExploreCard />
            </PostsContext.Provider>
          </div>
        ))}
      </div>
    </main>
  );
}
