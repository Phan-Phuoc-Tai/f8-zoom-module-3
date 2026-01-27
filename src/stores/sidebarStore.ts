import {
  AtSign,
  Bookmark,
  Circle,
  Compass,
  Grid2x2Plus,
  Heart,
  House,
  MessageSquareWarning,
  Phone,
  Plus,
  Search,
  Send,
  Settings,
  SquareActivity,
  SquarePlay,
  Sun,
} from "lucide-react";
import { create } from "zustand";
import { type LucideIcon } from "lucide-react";

type SidebarType = {
  id: number;
  title: string;
  url: string;
  icon?: LucideIcon;
}[];
interface SidebarState {
  sidebarMenus: SidebarType;
  sidebarMores: SidebarType;
  sidebarMetas: SidebarType;
}
export const useSidebarStore = create<SidebarState>()(() => ({
  sidebarMenus: [
    {
      id: 1,
      title: "Trang chủ",
      url: "/",
      icon: House,
    },
    {
      id: 2,
      title: "Reels",
      url: "#",
      icon: SquarePlay,
    },
    {
      id: 3,
      title: "Tin nhắn",
      url: "#",
      icon: Send,
    },
    {
      id: 4,
      title: "Tìm kiếm",
      url: "#",
      icon: Search,
    },
    {
      id: 5,
      title: "Khám phá",
      url: "/explore",
      icon: Compass,
    },
    {
      id: 6,
      title: "Thông báo",
      url: "#",
      icon: Heart,
    },
    {
      id: 7,
      title: "Tạo",
      url: "#",
      icon: Plus,
    },
  ],
  sidebarMores: [
    {
      id: 1,
      title: "Cài đặt",
      url: "#",
      icon: Settings,
    },
    {
      id: 2,
      title: "Hoạt động của bạn",
      url: "#",
      icon: SquareActivity,
    },
    {
      id: 3,
      title: "Đã lưu",
      url: "#",
      icon: Bookmark,
    },
    {
      id: 4,
      title: "Chuyển chế độ",
      url: "#",
      icon: Sun,
    },
    {
      id: 5,
      title: "Báo cáo sự cố",
      url: "#",
      icon: MessageSquareWarning,
    },
  ],
  sidebarMetas: [
    {
      id: 1,
      title: "Meta AI",
      url: "https://www.meta.ai/?utm_source=ig_web_nav",
      icon: Circle,
    },
    {
      id: 2,
      title: "AI Studio",
      url: "https://aistudio.instagram.com/?utm_source=ig_web_nav",
      icon: Grid2x2Plus,
    },
    {
      id: 3,
      title: "WhatsApp",
      url: "https://www.whatsapp.com/?utm_source=ig_web_nav&utm_campaign=afm",
      icon: Phone,
    },
    {
      id: 4,
      title: "Threads",
      url: "https://www.threads.com/",
      icon: AtSign,
    },
  ],
}));
