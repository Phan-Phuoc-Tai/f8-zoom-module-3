import { createContext, type Dispatch, type SetStateAction } from "react";

interface CommentContextType {
  user?: {
    _id: string;
    username: string;
  };
  setOpenModalAction?: Dispatch<SetStateAction<boolean>>;
  commentId?: string;
  content?: string;
}

export const CommentContext = createContext<CommentContextType | null>(null);
