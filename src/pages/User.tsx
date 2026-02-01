import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { NavLink, useParams } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { useQuery } from "@tanstack/react-query";
import { UserPostsCache, UserProfile } from "../cache/Cache";
import LoadingUserProfile from "../tools/LoadingUserProfile";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Bookmark, Grid3x3, ListVideo } from "lucide-react";
import { useEffect } from "react";
import InfoUser from "../components/children/user/InfoUser";
import LoadingExplore from "../tools/LoadingExplore";
import { UserContext } from "../contexts/UserContext";
import { PostUser } from "../components/children/user/PostUser";
export default function User() {
  const { isLoading, profileUser, userPosts, getUserById, getUserPosts } =
    useUserStore();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { userId } = useParams();
  const { data: _data } = useQuery({
    queryKey: UserProfile.profile,
    queryFn: () => {
      if (getUserById && userId) {
        return getUserById(userId);
      }
    },
    retry: 2,
  });
  const { data: _posts } = useQuery({
    queryKey: UserPostsCache.list,
    queryFn: () => {
      if (getUserPosts && userId) {
        return getUserPosts(userId);
      }
    },
    retry: 2,
  });
  useEffect(() => {}, [profileUser]);

  return (
    <main className="flex-1 ml-50 py-12">
      <div className="flex items-center justify-center w-6xl px-4">
        <div className="user-info w-full">
          <div className="flex items-center justify-center gap-8">
            {isLoading ? <LoadingUserProfile /> : <InfoUser />}
          </div>
          {!isLoading && (
            <div className="flex items-center justify-center gap-2 mt-6 ml-20.5">
              <NavLink to={"#"}>
                <Button
                  size={null}
                  className="w-84 py-3 bg-black/85 hover:bg-black cursor-pointer"
                >
                  Chỉnh sửa trang cá nhân
                </Button>
              </NavLink>
              <Button size={null} className="w-84 py-3 bg-black/85 ">
                Xem kho lưu trữ
              </Button>
            </div>
          )}
        </div>
      </div>
      <Tabs
        defaultValue="posts"
        className="px-4 flex items-center justify-center w-6xl mt-12"
      >
        <TabsList className="bg-transparent p-0 gap-32 group-data-[orientation=horizontal]/tabs:h-auto w-full rounded-none border-b border-black/10">
          <TabsTrigger
            value="posts"
            className="p-2 h-11 group-data-[orientation=vertical]/tabs:w-11 flex-0 focus-visible:border-0 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none group-data-[variant=default]/tabs-list:data-[state=active]:border-b-black cursor-pointer hover:border-b-black rounded-none "
          >
            <Grid3x3 style={{ width: 24, height: 24 }} />
          </TabsTrigger>
          <TabsTrigger
            value="postsSaved"
            className="p-2 h-11 group-data-[orientation=vertical]/tabs:w-11 flex-0 focus-visible:border-0 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none group-data-[variant=default]/tabs-list:data-[state=active]:border-b-black cursor-pointer hover:border-b-black rounded-none "
          >
            <Bookmark style={{ width: 24, height: 24 }} />
          </TabsTrigger>
          <TabsTrigger
            value="postsTag"
            className="p-2 h-11 group-data-[orientation=vertical]/tabs:w-11 flex-0 focus-visible:border-0 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none group-data-[variant=default]/tabs-list:data-[state=active]:border-b-black cursor-pointer hover:border-b-black rounded-none "
          >
            <ListVideo style={{ width: 24, height: 24 }} />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="grid grid-cols-4 gap-1">
          {isLoading &&
            Array.from({ length: 12 }).map((_, index) => (
              <LoadingExplore key={index} />
            ))}
          {userPosts?.map((post, index) => (
            <div key={index} className="w-max">
              <UserContext.Provider value={{ post }}>
                <PostUser />
              </UserContext.Provider>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="postsSaved">Change your password here.</TabsContent>
      </Tabs>
    </main>
  );
}
