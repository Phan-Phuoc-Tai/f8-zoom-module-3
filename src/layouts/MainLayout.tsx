import { Outlet, useLocation } from "react-router-dom";
import InsSideBar from "../components/parent/InsSideBar";
import { SidebarProvider } from "../components/ui/sidebar";
import { useAuthStore } from "../stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { Profile } from "../cache/Cache";
import { useEffect } from "react";

export default function MainLayout() {
  const { getProfile } = useAuthStore();
  const { pathname } = useLocation();
  const { data: _data } = useQuery({
    queryKey: Profile.profile,
    queryFn: getProfile,
    retry: 2,
  });
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  const isOpen = pathname !== "/chat" ? true : false;
  return (
    <div className="flex">
      <SidebarProvider open={isOpen} className="w-max gap-0">
        <InsSideBar />
      </SidebarProvider>
      <Outlet />
    </div>
  );
}
