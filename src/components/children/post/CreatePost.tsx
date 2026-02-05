import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../../ui/dialog";
import { DialogFooter, DialogHeader } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Image, SquarePlay } from "lucide-react";
import React, {
  useEffect,
  useRef,
  useState,
  type SetStateAction,
  type Dispatch,
} from "react";
import { usePostStore } from "../../../stores/postStore";
import { Spinner } from "../../ui/spinner";

type Props = {
  setOpenCreatePost: Dispatch<SetStateAction<boolean>>;
};

export default function CreatePost({ setOpenCreatePost }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const { createPost, fetchNewsFeed, isLoading } = usePostStore();
  useEffect(() => {
    if (!file) {
      const timeout = setTimeout(() => {
        if (setPreviewUrl) {
          setPreviewUrl(null);
        }
      }, 0);
      return () => clearTimeout(timeout);
    }

    const url = URL.createObjectURL(file);
    const timeout = setTimeout(() => {
      if (setPreviewUrl) {
        setPreviewUrl(url);
      }
    }, 0);
    return () => {
      clearTimeout(timeout);
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    setFile(selectedFile);
  };
  const handleChangeCaption = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value);
  };
  const handleSubmitPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      createPost(file, caption)
        .then(() => fetchNewsFeed())
        .then(() => setOpenCreatePost(false));
    }
  };

  return (
    <Dialog defaultOpen={true} onOpenChange={setOpenCreatePost}>
      <DialogContent className="bg-[#e9e9e9] border-none outline-none p-0 max-w-172 h-160 flex flex-col gap-0">
        <DialogHeader className="items-center border-b border-white p-4 h-14">
          <DialogTitle>Tạo bài viết mới</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {!file ? (
          <div className="flex flex-col h-full items-center justify-center">
            <div className="flex flex-col gap-4 items-center justify-center">
              <div className="flex items-center gap-2">
                <Image style={{ width: 46, height: 46 }} />
                <SquarePlay style={{ width: 46, height: 46 }} />
              </div>
              <p>Tải ảnh và video vào đây</p>
              <Button
                onClick={handleChooseFile}
                className="bg-blue-600 hover:bg-blue-800 cursor-pointer focus-visible:ring-0"
              >
                Chọn từ máy tính
              </Button>
              <input
                type="file"
                accept="image/*, video/*"
                ref={fileInputRef}
                hidden
                onChange={handleChangeFile}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full items-center justify-center">
            <div className="flex-1 flex items-center justify-center bg-black/80">
              <div className="flex flex-col gap-4 items-center justify-center ">
                {previewUrl && file!.type.startsWith("image") ? (
                  <img
                    src={previewUrl}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <video
                    src={previewUrl!}
                    autoPlay
                    className="max-h-full max-w-full object-contain"
                  />
                )}
              </div>
            </div>

            <form
              onSubmit={handleSubmitPost}
              className="flex items-center justify-between border-t border-white w-full shrink-0"
            >
              <textarea
                placeholder="Viết chú thích"
                className="px-3 py-4 bg-transparent outline-none resize-none w-full text-sm max-h-32"
                value={caption}
                onChange={handleChangeCaption}
              />

              <DialogFooter className="pr-4">
                <DialogClose asChild>
                  <Button
                    className="cursor-pointer"
                    variant="outline"
                    onClick={() => setOpenCreatePost(false)}
                  >
                    Huỷ
                  </Button>
                </DialogClose>
                <Button
                  disabled={isLoading}
                  className="bg-blue-500 hover:bg-blue-600 cursor-pointer"
                  type="submit"
                >
                  {isLoading ? <Spinner /> : "Đăng"}
                </Button>
              </DialogFooter>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
