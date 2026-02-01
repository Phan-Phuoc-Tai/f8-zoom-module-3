import { createContext } from "react";

interface UserContextType {
  suggestedUser?: {
    _id?: string;
    username?: string;
    fullName?: string;
    profilePicture?: string;
    postsCount?: number;
    followersCount?: number;
    followingCount?: number;
    recentImages?: string;
    isFollowing?: boolean;
  };
  user?: {
    username?: string;
    fullName?: string;
    email?: string;
    _id?: string;
    profilePicture?: string | null;
  };
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
}

export const UserContext = createContext<UserContextType | null>(null);
