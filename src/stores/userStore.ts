import { create } from "zustand";
import { HTTP } from "../tools/HTTP";

interface UserStoreType {
  fetchSuggestedUser?: () => Promise<[]>;
}
export const useUserStore = create<UserStoreType>()(() => ({
  fetchSuggestedUser: async () => {
    const response = await HTTP.get(`/api/users/suggested?limit=5`);
    const data = response.data.data;
    return data;
  },
}));
