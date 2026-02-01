import { create } from "zustand";
import { HTTP } from "../tools/HTTP";
import { toast } from "sonner";
import axios from "axios";

export interface FormDataType {
  email?: string;
}
export interface FormLoginData extends FormDataType {
  password: string;
}

export interface FormResetData {
  password: string;
  confirmPassword: string;
}
export interface FormRegisterData extends FormLoginData {
  username: string;
  fullName: string;
  confirmPassword: string;
}

export interface FormUpdateProfile {
  fullName?: string;
  bio?: string;
  website?: string;
  gender?: string;
  profilePicture?: string | null;
}

interface UserProfileType {
  _id?: string;
  email?: string;
  username?: string;
  fullName?: string;
  profilePicture?: string | null;
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
}
interface AuthStoreType {
  isVerified?: boolean;
  isAuthenticated?: boolean;
  isRegisterSuccess?: boolean;
  isLoading?: boolean;
  isSended?: boolean;
  isResetSuccess?: boolean;
  user?: UserProfileType;
  token: string;
  handleRegister?: (data: FormRegisterData) => void;
  handleVerifyEmail?: (token: string) => void;
  handleResendVerificationEmail?: (email: string) => void;
  handleLogin?: (data: FormLoginData) => void;
  getProfile?: () => Promise<UserProfileType>;
  logout?: () => void;
  handleSendEmailReset?: (email: string) => void;
  handleResetPassword?: (data: FormResetData, token: string) => void;
  handleUpdateProfile?: (data: FormUpdateProfile) => Promise<UserProfileType>;
}

export const useAuthStore = create<AuthStoreType>()((set) => ({
  isVerified: false,
  isAuthenticated: false,
  isRegisterSuccess: false,
  isLoading: false,
  isSended: false,
  isResetSuccess: false,
  user: {},
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
        user: output,
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
    return set({
      token: "",
      isAuthenticated: false,
    });
  },

  handleSendEmailReset: async (email) => {
    try {
      set({ isLoading: true });
      const response = await HTTP.post(`/api/auth/forgot-password`, {
        email,
      }).catch((error) => {
        throw error;
      });
      return set({
        isSended: response.data.success,
        isResetSuccess: !response.data.success,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    } finally {
      set({ isLoading: false });
    }
  },

  handleResetPassword: async (data, token) => {
    try {
      set({ isLoading: true });
      const response = await HTTP.post(`/api/auth/reset-password/${token}`, {
        ...data,
      }).catch((error) => {
        throw error;
      });
      return set({
        isSended: !response.data.success,
        isResetSuccess: response.data.success,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    } finally {
      set({ isLoading: false });
    }
  },

  handleUpdateProfile: async (data: FormUpdateProfile) => {
    try {
      set({ isLoading: true });
      const formData = new FormData();

      if (data.fullName) {
        formData.append("fullName", data.fullName);
      }
      if (data.bio) {
        formData.append("bio", data.bio);
      }
      if (data.website) {
        formData.append("website", data.website);
      }
      if (data.gender) {
        formData.append("gender", data.gender);
      }

      if (data.profilePicture && data.profilePicture.length > 0) {
        formData.append("profilePicture", data.profilePicture[0]);
      }
      const response = await HTTP.patch(`/api/users/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).catch((error) => {
        throw error;
      });
      const output = response.data;
      toast.success(output.message);
      return output.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));
