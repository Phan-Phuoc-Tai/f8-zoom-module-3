import { use, useState } from "react";
import { CommentContext } from "../../../contexts/CommentContext";
import { useAuthStore } from "../../../stores/authStore";
import { usePostStore } from "../../../stores/postStore";
import { Button } from "../../ui/button";

export default function CommentAction() {
  const context = use(CommentContext);
  const setOpenModalAction = context?.setOpenModalAction;
  const user = context?.user;
  const commentId = context?.commentId;
  const content = context?.content;
  const { user: mainUser } = useAuthStore();
  const isOwner = user?._id === mainUser?._id;
  const [confirm, setConfirm] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [newComment, setNewComment] = useState(content);
  const { isLoading, deleteComment, postId, getPostDetail, updateComment } =
    usePostStore();
  const handleCloseModal = () => {
    if (setOpenModalAction) {
      setOpenModalAction(false);
    }
  };
  const handleDeleteComment = () => {
    if (commentId && setOpenModalAction) {
      deleteComment(postId, commentId)
        .then(() => setOpenModalAction(false))
        .then(() => getPostDetail(postId));
    }
  };
  const handleUpdateComment = () => {
    if (commentId && setOpenModalAction && newComment) {
      updateComment(postId, commentId, newComment)
        .then(() => setOpenModalAction(false))
        .then(() => getPostDetail(postId));
    }
  };
  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center bg-white w-90 rounded-md absolute z-190">
        {isOwner && !confirm && !isEdit && (
          <>
            <p
              onClick={() => setEdit(true)}
              className="text-xl py-2 hover:bg-black/10 w-full text-center cursor-pointer"
            >
              Chỉnh sửa
            </p>
            <p
              onClick={() => setConfirm(true)}
              className="text-xl py-2 text-red-500 hover:bg-black/10 w-full text-center border-b border-black/10 cursor-pointer"
            >
              Xoá bình luận
            </p>
            <p
              className="text-xl py-2 hover:bg-black/10 w-full text-center cursor-pointer"
              onClick={handleCloseModal}
            >
              Huỷ
            </p>
          </>
        )}
        {isOwner && confirm && (
          <>
            <p className="text-md text-red-400 font-medium py-2 w-full text-center">
              Bạn chắc chắn muốn xóa bình luận này?
            </p>
            <button
              onClick={handleDeleteComment}
              disabled={isLoading}
              className="text-xl py-2 text-red-600 hover:bg-red-500/20 w-full text-center border-b border-black/10 cursor-pointer"
            >
              {isLoading ? "Đang xoá..." : "Xác nhận xoá"}
            </button>
            <p
              onClick={() => setConfirm(false)}
              className="text-xl py-2 hover:bg-black/10 w-full text-center cursor-pointer"
            >
              Huỷ
            </p>
          </>
        )}
        {isOwner && isEdit && (
          <div className="w-120 p-4 bg-white rounded-md">
            <h3 className="mb-2 text-lg font-medium">Chỉnh sửa bình luận</h3>
            <textarea
              cols={50}
              rows={10}
              className="w-full border border-black/20 outline-none rounded-md p-2"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <div className="flex items-center justify-end gap-2 mt-2">
              <Button
                onClick={handleCloseModal}
                variant={"outline"}
                className="cursor-pointer"
              >
                Huỷ
              </Button>
              <Button
                onClick={handleUpdateComment}
                disabled={isLoading}
                className="cursor-pointer bg-blue-500 text-white/90 hover:bg-blue-700"
              >
                {isLoading ? "Đang lưu" : "Lưu"}
              </Button>
            </div>
          </div>
        )}
        {!isOwner && (
          <>
            <p className="text-xl py-2 text-red-500 hover:bg-black/10 w-full text-center border-b border-black/10">
              Báo cáo
            </p>
            <p
              className="text-xl py-2 hover:bg-black/10 w-full text-center"
              onClick={handleCloseModal}
            >
              Huỷ
            </p>
          </>
        )}
      </div>
      <div
        onClick={handleCloseModal}
        className="overlay absolute inset-0 bg-black/40"
      ></div>
    </div>
  );
}
