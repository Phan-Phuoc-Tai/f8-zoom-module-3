import { Outlet } from "react-router-dom";
import InsSideBar from "../components/parent/InsSideBar";
import { SidebarProvider } from "../components/ui/sidebar";
import { useAuthStore } from "../stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { Profile } from "../cache/Cache";

export default function MainLayout() {
  const { getProfile } = useAuthStore();
  const { data } = useQuery({
    queryKey: Profile.profile,
    queryFn: getProfile,
    retry: 2,
  });
  return (
    <div className="flex">
      <SidebarProvider defaultOpen={true} className="w-max gap-0">
        <InsSideBar />
      </SidebarProvider>
      <Outlet />
    </div>
  );
}
