import { Ellipsis, X } from "lucide-react";
import { Button } from "../../ui/button";
import { useQuery } from "@tanstack/react-query";
import { PostCache } from "../../../cache/Cache";
import { usePostStore } from "../../../stores/postStore";
import { Skeleton } from "../../ui/skeleton";
import Comment from "./Comment";
import PostDetailInfo from "./PostDetailInfo";
import { type Dispatch, type SetStateAction } from "react";
import { Spinner } from "../../ui/spinner";
import EnterComment from "./EnterComment";
type Props = {
  postId: string | undefined;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function PostDetail({ postId, setOpen }: Props) {
  const { getPostDetail, comments } = usePostStore();
  const {
    data: postDetail,
    isLoading,
    error,
  } = useQuery({
    queryKey: [PostCache.item, postId],
    queryFn: () => getPostDetail(postId!),
  });

  const caption = postDetail?.caption;
  const userId = postDetail?.userId;
  const baseUrl = "https://instagram.f8team.dev";

  if (error) {
    return (
      <div className="fixed inset-0 z-100 w-full min-h-screen flex items-center justify-center ">
        <div className="absolute z-90 flex items-center justify-center flex-col bg-white h-40 w-150 px-4 shadow-2xl rounded-sm overflow-hidden">
          <p className="text-black/80 font-semibold text-lg">
            Bài viết này không còn tồn tại hoặc người dùng đã bị xoá.
          </p>
          <Button
            variant={"outline"}
            size={null}
            className="block border-0 outline-none shadow-none text-blue-500 bg-transparent hover:bg-transparent p-1 hover:text-blue-700 rounded-full cursor-pointer text-lg mt-3"
            onClick={() => setOpen(false)}
          >
            Đóng
          </Button>
        </div>
        <div
          onClick={() => setOpen(false)}
          className="overlay absolute inset-0 bg-black/40"
        ></div>
      </div>
    );
  }
  return (
    <div className="fixed inset-0 z-100 w-full min-h-screen flex items-center justify-center ">
      <div className="absolute z-90 flex items-center justify-center bg-black  h-180 shadow-2xl rounded-sm  overflow-hidden">
        <div className="left w-180 flex items-center justify-center ">
          {isLoading ? (
            <Skeleton className="h-100 w-180" />
          ) : (
            <>
              {postDetail?.image && (
                <img src={`${baseUrl}${postDetail?.image}`} />
              )}
              {postDetail?.video && (
                <video
                  src={`${baseUrl}${postDetail?.video}`}
                  autoPlay
                  loop
                  controls
                />
              )}
            </>
          )}
        </div>
        <div className="right w-115 bg-white h-full relative">
          <div className="flex items-center justify-between gap-3 p-4 border-b border-black/20">
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-black font-medium">
                  <span>{userId?.username.charAt(0).toUpperCase()}</span>
                </div>
                <div className="mr-auto">
                  <p className="font-medium">
                    {userId?.username
                      ? userId?.username
                      : "Tài khoản đã bị xoá"}
                  </p>
                </div>
              </>
            )}

            <div>
              <Button
                size="icon-lg"
                variant="outline"
                className="rounded-full border-0 outline-none shadow-none"
              >
                <Ellipsis />
              </Button>
            </div>
          </div>
          {isLoading ? (
            <div className="p-4 flex items-center gap-2">
              <Spinner />
              <span>Đang tải dữ liệu...</span>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between gap-3 p-4">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-black font-medium">
                  <span>{userId?.username.charAt(0).toUpperCase()}</span>
                </div>
                <div className="mr-auto flex items-center gap-2 text-sm">
                  <p className="font-medium">
                    {userId?.username
                      ? userId?.username
                      : "Tài khoản đã bị xoá"}
                  </p>
                  <p>{caption}</p>
                </div>
              </div>

              {comments &&
                comments.map((comment, index) => (
                  <div key={index}>
                    <Comment comment={comment} />
                  </div>
                ))}
              {postDetail && <PostDetailInfo postDetail={postDetail} />}
              {postId && <EnterComment postId={postId} />}
            </>
          )}
        </div>
      </div>
      <div
        onClick={() => setOpen(false)}
        className="overlay absolute inset-0 bg-black/40"
      ></div>
      <Button
        variant={"outline"}
        size={null}
        className="absolute top-2 right-2 border-0 outline-none shadow-none text-white bg-transparent hover:bg-white/75 p-1 hover:text-red-500 rounded-full cursor-pointer"
        onClick={() => setOpen(false)}
      >
        <X style={{ width: 28, height: 28 }} />
      </Button>
    </div>
  );
}
