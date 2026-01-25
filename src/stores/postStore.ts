import { create } from "zustand";
import { HTTP } from "../tools/HTTP";

interface usePostStoreType {
  fetchNewsFeed: () => Promise<[]>;
  fetchExplore: () => Promise<[]>;
}
export const usePostStore = create<usePostStoreType>()(() => ({
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
}));
