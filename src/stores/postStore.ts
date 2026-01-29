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
  comments?: [];
}

export interface NewFeeds extends PostType {
  userId?: {
    _id: string;
    username: string;
  };
  comments?: number;
}

export interface PostDetail extends PostType {
  userId?: {
    _id: string;
    username: string;
  };
}
interface DeleteType {
  success: boolean;
  message: string;
  data: null;
}
interface PostStoreType {
  isLoading: boolean;
  postId: string;
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
  posts?: NewFeeds[];
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
  deleteComment: (postId: string, commentId: string) => Promise<DeleteType>;
  updateComment: (
    postId: string,
    commentId: string,
    content: string,
  ) => Promise<CommentType>;
  createPost: (file: File, caption?: string) => Promise<PostType>;
}
export const usePostStore = create<PostStoreType>()((set) => ({
  isLoading: false,
  postId: "",
  comments: [],
  posts: [],
  fetchNewsFeed: async () => {
    const response = await HTTP.get(`/api/posts/feed`);
    const data = response.data;
    set({
      posts: data.data.posts,
    });
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
      postId: data.data._id,
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
  deleteComment: async (postId: string, commentId: string) => {
    try {
      set({ isLoading: true });
      const response = await HTTP.delete(
        `/api/posts/${postId}/comments/${commentId}`,
      ).catch((error) => {
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
  updateComment: async (postId: string, commentId: string, content: string) => {
    try {
      set({ isLoading: true });
      const response = await HTTP.patch(
        `/api/posts/${postId}/comments/${commentId}`,
        { content },
      ).catch((error) => {
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
  createPost: async (file: File, caption?: string) => {
    try {
      set({ isLoading: true });
      const formData = new FormData();
      if (file!.type.startsWith("image") && caption) {
        formData.append("file", file);
        formData.append("caption", caption);
      }
      const response = await HTTP.post(`/api/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).catch((error) => {
        throw error;
      });
      const data = response.data;
      toast.success(data.message);
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
