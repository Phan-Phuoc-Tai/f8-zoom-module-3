import { create } from "zustand";
import { HTTP } from "../tools/HTTP";
import { toast } from "sonner";
import axios from "axios";
export interface FormLoginData {
  email: string;
  password: string;
}
export interface FormRegisterData extends FormLoginData {
  username: string;
  fullName: string;
  confirmPassword: string;
}
interface AuthStoreType {
  isVerified?: boolean;
  isAuthenticated?: boolean;
  isRegisterSuccess?: boolean;
  isLoading?: boolean;
  user?: {
    username?: string;
    fullName?: string;
    email?: string;
    _id?: string;
    profilePicture?: string | null;
  };
  token: string;
  handleRegister?: (data: FormRegisterData) => void;
  handleVerifyEmail?: (token: string) => void;
  handleResendVerificationEmail?: (email: string) => void;
  handleLogin?: (data: FormLoginData) => void;
  getProfile?: () => void;
  logout?: () => void;
}

export const useAuthStore = create<AuthStoreType>()((set) => ({
  isVerified: false,
  isAuthenticated: false,
  isRegisterSuccess: false,
  isLoading: false,
  user: {
    username: "",
    fullName: "",
    email: "",
    _id: "",
    profilePicture: "",
  },
  token: "",
  handleRegister: async (data) => {
    try {
      set({ isLoading: true });
      const response = await HTTP.post(`/api/auth/register`, { ...data }).catch(
        (error) => {
          throw error;
        },
      );
      const output = response.data.data;
      toast.success(response.data.message);
      return set({
        isRegisterSuccess: true,
        user: {
          email: output.email,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    } finally {
      set({ isLoading: false });
    }
  },
  handleVerifyEmail: async (token) => {
    try {
      set({ isLoading: true });
      const response = await HTTP.post(`/api/auth/verify-email/${token}`).catch(
        (error) => {
          throw error;
        },
      );
      toast.success(response.data.message);
      return set({
        isVerified: true,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    } finally {
      set({ isLoading: false });
    }
  },
  handleResendVerificationEmail: async (email) => {
    try {
      set({ isLoading: true });
      const response = await HTTP.post(`/api/auth/resend-verification-email`, {
        email,
      }).catch((error) => {
        throw error;
      });
      toast.success(response.data.message);
      return set({
        isVerified: true,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    } finally {
      set({ isLoading: false });
    }
  },
  handleLogin: async (data) => {
    try {
      set({ isLoading: true });
      const response = await HTTP.post(`/api/auth/login`, { ...data }).catch(
        (error) => {
          throw error;
        },
      );

      const output = response.data.data;
      localStorage.setItem("access_token", output.tokens.accessToken);
      localStorage.setItem("refresh_token", output.tokens.refreshToken);
      toast.success(response.data.message);

      return set({
        isAuthenticated: true,
        token: output.tokens.accessToken,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    } finally {
      set({ isLoading: false });
    }
  },

  getProfile: async () => {
    try {
      set({ isLoading: true });
      const response = await HTTP.get(`/api/users/profile`).catch((error) => {
        throw error;
      });
      const output = response.data.data;
      set({
        isAuthenticated: true,
        user: {
          email: output.email,
          username: output.username,
          fullName: output.fullName,
          _id: output._id,
          profilePicture: output.profilePicture,
        },
      });
      return output;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    } finally {
      set({ isLoading: false });
    }
  },
  logout: () => {
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  },
}));
