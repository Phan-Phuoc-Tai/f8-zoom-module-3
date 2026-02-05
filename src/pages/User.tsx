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
import InfoUser from "../components/children/user/InfoUser";
import LoadingExplore from "../tools/LoadingExplore";
import { UserContext } from "../contexts/UserContext";
import { PostUser } from "../components/children/user/PostUser";
import { cn } from "../lib/utils";
import { useAuthStore } from "../stores/authStore";
import { useEffect } from "react";
export default function User() {
  const {
    isLoading,
    isLoadingPost,
    userPosts,
    savedPosts,
    videoPosts,
    getUserById,
    getUserPosts,
  } = useUserStore();
  const { userId } = useParams();
  const { user: mainUser } = useAuthStore();
  const isOwner = mainUser?._id === userId;

  const handleGetAllPost = () => {
    if (getUserPosts && userId) {
      getUserPosts(userId);
    }
  };
  const handleGetSavedPosts = () => {
    if (getUserPosts && userId) {
      getUserPosts(userId, "saved");
    }
  };
  const handleGetVideoPosts = () => {
    if (getUserPosts && userId) {
      getUserPosts(userId, "video");
    }
  };
  useEffect(() => {
    if (getUserById && userId) {
      getUserById(userId);
    }
    if (getUserPosts && userId) {
      getUserPosts(userId);
    }
  }, [userId]);
  return (
    <main className="flex-1 ml-50 py-12">
      <div className="flex items-center justify-center w-6xl px-4">
        <div className="user-info w-full">
          <div className="flex items-center justify-center gap-8">
            {isLoading ? <LoadingUserProfile /> : <InfoUser />}
          </div>
          {!isLoading && isOwner ? (
            <div className="flex items-center justify-center gap-2 mt-6 ml-20.5">
              <NavLink to={"/profile"}>
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
          ) : (
            <div className="flex items-center justify-center gap-2 mt-6 ml-20.5">
              <Button size={null} className="w-174 py-3 bg-black/85">
                Theo dõi
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
            onClick={handleGetAllPost}
          >
            <Grid3x3 style={{ width: 24, height: 24 }} />
          </TabsTrigger>
          <TabsTrigger
            value="postsSaved"
            className="p-2 h-11 group-data-[orientation=vertical]/tabs:w-11 flex-0 focus-visible:border-0 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none group-data-[variant=default]/tabs-list:data-[state=active]:border-b-black cursor-pointer hover:border-b-black rounded-none "
            onClick={handleGetSavedPosts}
          >
            <Bookmark style={{ width: 24, height: 24 }} />
          </TabsTrigger>
          <TabsTrigger
            value="postsVideo"
            className="p-2 h-11 group-data-[orientation=vertical]/tabs:w-11 flex-0 focus-visible:border-0 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none group-data-[variant=default]/tabs-list:data-[state=active]:border-b-black cursor-pointer hover:border-b-black rounded-none "
            onClick={handleGetVideoPosts}
          >
            <ListVideo style={{ width: 24, height: 24 }} />
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="posts"
          className={cn("", userPosts.length && "grid grid-cols-4 gap-1")}
        >
          {isLoadingPost && (
            <div className="flex-1 grid grid-cols-4 gap-1 w-6xl px-4">
              {Array.from({ length: 12 }).map((_, index) => (
                <LoadingExplore key={index} />
              ))}
            </div>
          )}
          {userPosts.length && !isLoadingPost ? (
            userPosts?.map((post, index) => (
              <div key={index} className="w-max">
                <UserContext.Provider value={{ post }}>
                  <PostUser />
                </UserContext.Provider>
              </div>
            ))
          ) : (
            <p className="mx-auto italic text-black/40">Chưa có bài viết nào</p>
          )}
        </TabsContent>

        <TabsContent
          value="postsSaved"
          className={cn("", savedPosts.length && "grid grid-cols-4 gap-1")}
        >
          {isLoadingPost && (
            <div className="flex-1 grid grid-cols-4 gap-1 w-6xl px-4">
              {Array.from({ length: 12 }).map((_, index) => (
                <LoadingExplore key={index} />
              ))}
            </div>
          )}
          {savedPosts.length && !isLoadingPost ? (
            savedPosts?.map((post, index) => (
              <div key={index} className="w-max">
                <UserContext.Provider value={{ post }}>
                  <PostUser />
                </UserContext.Provider>
              </div>
            ))
          ) : (
            <p className="mx-auto italic text-black/40">Chưa có bài viết nào</p>
          )}
        </TabsContent>
        <TabsContent
          value="postsVideo"
          className={cn("", videoPosts.length && "grid grid-cols-4 gap-1")}
        >
          {isLoadingPost && (
            <div className="flex-1 grid grid-cols-4 gap-1 w-6xl px-4">
              {Array.from({ length: 12 }).map((_, index) => (
                <LoadingExplore key={index} />
              ))}
            </div>
          )}
          {videoPosts.length && !isLoadingPost ? (
            videoPosts?.map((post, index) => (
              <div key={index} className="w-max">
                <UserContext.Provider value={{ post }}>
                  <PostUser />
                </UserContext.Provider>
              </div>
            ))
          ) : (
            <p className="mx-auto italic text-black/40">Chưa có bài viết nào</p>
          )}
        </TabsContent>
      </Tabs>
    </main>
  );
}
