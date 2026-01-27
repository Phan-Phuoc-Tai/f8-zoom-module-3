import { createContext } from "react";

interface PostsContextType {
  caption: string;
  comments: number;
  createdAt: string | Date;
  image: string;
  isLiked: boolean;
  isSave: boolean;
  likedBy: string[];
  likes: number;
  mediaType: string;
  savedBy: string[];
  userId: { _id: string; username: string };
  video: string | null;
  _id: string;
}

export const PostsContext = createContext<PostsContextType | null>(null);
