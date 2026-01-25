import { Outlet } from "react-router-dom";
import InsSideBar from "../components/parent/InsSideBar";
import { SidebarProvider } from "../components/ui/sidebar";

export default function MainLayout() {
  return (
    <div className="flex">
      <SidebarProvider defaultOpen={true} className="w-max gap-0">
        <InsSideBar />
      </SidebarProvider>
      <Outlet />
    </div>
  );
}
