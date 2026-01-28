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
}

export const UserContext = createContext<UserContextType | null>(null);
