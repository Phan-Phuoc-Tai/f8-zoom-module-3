import { create } from "zustand";
import { HTTP } from "../tools/HTTP";
import { toast } from "sonner";
import axios from "axios";

interface UserRoot {
  _id?: string;
  username?: string;
  fullName?: string;
  profilePicture?: string | null;
}
export interface profileUserType {
  _id?: string;
  email?: string;
  username?: string;
  fullName?: string;
  profilePicture?: null;
  bio?: string;
  gender?: string;
  website?: string;
  isVerified?: boolean;
  verificationToken?: null;
  verificationTokenExpiry?: null;
  googleId?: null;
  resetPasswordToken?: null;
  resetPasswordExpiry?: null;
  createdAt?: string;
  updatedAt?: string;
  __v?: 0;
  followersCount?: number;
  followingCount?: number;
  isFollowing?: boolean;
}

interface UserPostType {
  _id?: string;
  caption?: string;
  image?: string | null;
  video?: string | null;
  mediaType?: string;
  likes?: number;
  comments?: number;
  likedBy?: string[];
  savedBy?: string[];
  createdAt?: string;
  isLiked?: boolean;
  isSaved?: boolean;
}

interface SearchUser {
  userId: string;
  searchedUserId: UserRoot;
  searchQuery: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface HistorySearchUser {
  userId: string;
  searchedUserId: UserRoot;
  searchQuery: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UserStoreType {
  profileUser: profileUserType;
  userPosts: UserPostType[];
  savedPosts: UserPostType[];
  videoPosts: UserPostType[];
  isLoading: boolean;
  isLoadingPost: boolean;
  isLoadingSearch: boolean;
  fetchSuggestedUser?: () => Promise<[]>;
  getUserById?: (userId: string) => Promise<profileUserType>;
  getUserPosts?: (userId: string, type?: "all" | "video" | "saved") => void;
  searchUser: (keyword: string) => Promise<profileUserType[]>;
  addSearchHistory: (
    searchedUserId: string,
    searchQuery: string,
  ) => Promise<SearchUser>;
  getSearchHistory: () => Promise<HistorySearchUser[]>;
  deleteSearchHistory: (historyId: string) => Promise<null>;
  clearAllSearchHistory: () => Promise<null>;
}
export const useUserStore = create<UserStoreType>()((set) => ({
  profileUser: {},
  userPosts: [],
  savedPosts: [],
  videoPosts: [],
  isLoading: false,
  isLoadingPost: false,
  isLoadingSearch: false,
  fetchSuggestedUser: async () => {
    const response = await HTTP.get(`/api/users/suggested?limit=5`);
    const data = response.data.data;
    return data;
  },
  getUserById: async (userId: string) => {
    try {
      set({
        isLoading: true,
      });
      const response = await HTTP.get(`/api/users/${userId}`).catch((error) => {
        throw error;
      });
      const data = response.data.data;
      set({
        profileUser: data,
      });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    } finally {
      set({
        isLoading: false,
      });
    }
  },
  getUserPosts: async (
    userId: string,
    type: "all" | "video" | "saved" = "all",
  ) => {
    try {
      set({
        isLoadingPost: true,
      });
      const response = await HTTP.get(
        `/api/posts/user/${userId}?filter=${type}`,
      );
      const data = response.data.data;
      if (type === "saved") {
        set({
          savedPosts: data.posts,
        });
        return data;
      }
      if (type === "video") {
        set({
          videoPosts: data.posts,
        });
        return data;
      }
      set({
        userPosts: data.posts,
      });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    } finally {
      set({
        isLoadingPost: false,
      });
    }
  },
  searchUser: async (keyword) => {
    try {
      set({
        isLoadingSearch: true,
      });
      const response = await HTTP.get(`/api/users/search?q=${keyword}`).catch(
        (error) => {
          throw error;
        },
      );
      const data = response.data.data;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    } finally {
      set({
        isLoadingSearch: false,
      });
    }
  },
  addSearchHistory: async (searchedUserId, searchQuery) => {
    try {
      const response = await HTTP.post(`/api/search-history`, {
        searchedUserId,
        searchQuery,
      }).catch((error) => {
        throw error;
      });
      const data = response.data.data;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  },
  getSearchHistory: async () => {
    try {
      set({
        isLoadingSearch: true,
      });
      const response = await HTTP.get(`/api/search-history?limit=20`).catch(
        (error) => {
          throw error;
        },
      );
      const data = response.data.data;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    } finally {
      set({
        isLoadingSearch: false,
      });
    }
  },
  deleteSearchHistory: async (historyId) => {
    try {
      const response = await HTTP.delete(
        `/api/search-history/${historyId}`,
      ).catch((error) => {
        throw error;
      });
      const data = response.data.data;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  },
  clearAllSearchHistory: async () => {
    try {
      const response = await HTTP.delete(`/api/search-history`).catch(
        (error) => {
          throw error;
        },
      );
      const data = response.data.data;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  },
}));
