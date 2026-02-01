import { createContext, type Dispatch, type SetStateAction } from "react";

interface PostsContextType {
  post?: {
    caption?: string;
    comments?: number;
    createdAt?: string | Date;
    image?: string | null;
    isLiked?: boolean;
    isSaved?: boolean;
    likedBy?: string[];
    likes?: number;
    mediaType?: string;
    savedBy?: string[];
    userId?: { _id: string; username: string };
    video?: string | null;
    _id?: string;
  };
  setPosts?: Dispatch<SetStateAction<[] | undefined>>;
  userId?: {
    _id: string;
    username: string;
  };
  setOpenModalAction?: Dispatch<SetStateAction<boolean>>;
  postId?: string;
  caption?: string;
}

export const PostsContext = createContext<PostsContextType | null>(null);
