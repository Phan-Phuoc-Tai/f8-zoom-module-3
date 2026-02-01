import { create } from "zustand";
import { HTTP } from "../tools/HTTP";
import { toast } from "sonner";
import axios from "axios";

interface profileUserType {
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

interface UserStoreType {
  profileUser: profileUserType;
  userPosts: UserPostType[];
  isLoading: boolean;
  fetchSuggestedUser?: () => Promise<[]>;
  getUserById?: (userId: string) => void;
  getUserPosts?: (userId: string) => void;
}
export const useUserStore = create<UserStoreType>()((set) => ({
  profileUser: {},
  userPosts: [],
  isLoading: false,
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
  getUserPosts: async (userId: string) => {
    const response = await HTTP.get(`/api/posts/user/${userId}?filter=all`);
    const data = response.data.data;
    set({
      userPosts: data.posts,
    });
    return data;
  },
}));
