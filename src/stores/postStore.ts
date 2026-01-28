import { create } from "zustand";
import { HTTP } from "../tools/HTTP";
import axios from "axios";
import { toast } from "sonner";

export interface FormCommentData {
  comment: string;
}
interface PostType {
  _id?: string;
  caption?: string | undefined;
  image?: string | null;
  video?: string | null;
  mediaType?: string;
  likes?: number | undefined;
  comments?: [];
  likedBy?: string[];
  savedBy?: string[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  isLiked?: boolean;
  isSaved?: boolean;
}
export interface CommentType {
  postId: string;
  userId: {
    _id: string;
    email: string;
    username: string;
  };
  parentCommentId: null;
  content: string;
  likes: number;
  likedBy: string[];
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface Post extends PostType {
  userId?: string;
}

export interface PostDetail extends PostType {
  userId?: {
    _id: string;
    username: string;
  };
}
interface PostStoreType {
  isLoading: boolean;
  comments?: {
    content?: string;
    createdAt?: string;
    likes?: number;
    user?: {
      _id: string;
      username: string;
    };
    _id?: string;
  }[];
  fetchNewsFeed: () => Promise<[]>;
  fetchExplore: () => Promise<[]>;
  likePost: (postId: string) => Promise<Post>;
  unLikePost: (postId: string) => Promise<Post>;
  savePost: (
    postId: string,
  ) => Promise<{ success: boolean; message: string; data: null }>;
  unSavePost: (
    postId: string,
  ) => Promise<{ success: boolean; message: string; data: null }>;
  getPostDetail: (postId: string) => Promise<PostDetail>;
  createComment: (
    postId: string,
    content: string,
    parentCommentId: string | null,
  ) => Promise<CommentType>;
}
export const usePostStore = create<PostStoreType>()((set) => ({
  isLoading: false,
  comments: [],
  fetchNewsFeed: async () => {
    const response = await HTTP.get(`/api/posts/feed`);
    const data = response.data;
    return data.data.posts;
  },
  fetchExplore: async () => {
    const response = await HTTP.get(`/api/posts/explore`);
    const data = response.data;
    return data.data.posts;
  },
  likePost: async (postId: string) => {
    const response = await HTTP.post(`/api/posts/${postId}/like`);
    const data = response.data;
    return data.data;
  },
  unLikePost: async (postId: string) => {
    const response = await HTTP.delete(`/api/posts/${postId}/like`);
    const data = response.data;
    return data.data;
  },
  savePost: async (postId: string) => {
    const response = await HTTP.post(`/api/posts/${postId}/save`);
    const data = response.data;
    return data.data;
  },
  unSavePost: async (postId: string) => {
    const response = await HTTP.delete(`/api/posts/${postId}/save`);
    const data = response.data;
    return data.data;
  },
  getPostDetail: async (postId: string) => {
    const response = await HTTP.get(`/api/posts/${postId}`);
    const data = response.data;
    set({
      comments: data.data.comments,
    });
    return data.data;
  },
  createComment: async (
    postId: string,
    content: string,
    parentCommentId: string | null = null,
  ) => {
    try {
      set({ isLoading: true });
      const response = await HTTP.post(`/api/posts/${postId}/comments`, {
        content,
        parentCommentId,
      }).catch((error) => {
        throw error;
      });
      const data = response.data;
      return data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));
