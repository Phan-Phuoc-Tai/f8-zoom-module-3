import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { LayoutPanelTop, Menu } from "lucide-react";
import SidebarContentItem from "../children/SidebarContentItem";
import { useSidebarStore } from "../../stores/sidebarStore";
import DropMenuSidebarMeta from "../children/DropMenuSidebarMeta";
import { useState } from "react";
import { SidebarContext } from "../../contexts/SidebarContext";
import { useAuthStore } from "../../stores/authStore";
import { Spinner } from "../ui/spinner";
import SidebarProfile from "../children/SidebarProfile";
import { NavLink } from "react-router-dom";

export default function InsSideBar() {
  const { sidebarMenus, sidebarMores, sidebarMetas } = useSidebarStore();
  const [itemActive, setItemActive] = useState(1);
  const { isLoading, logout } = useAuthStore();
  const handleLogout = () => {
    if (logout) {
      logout();
    }
  };
  return (
    <Sidebar
      collapsible="icon"
      className="w-50 group-data-[collapsible=icon]:w-15"
    >
      <SidebarHeader>
        <NavLink
          to={"/"}
          className="h-15 w-30 flex items-center justify-center mx-auto mt-5"
        >
          <img src="/images/ins-logo.svg" />
        </NavLink>
      </SidebarHeader>
      <SidebarContent className="justify-center">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {sidebarMenus.map((sidebarItem) => (
                <div key={sidebarItem.id}>
                  <SidebarContext.Provider
                    value={{
                      itemActive,
                      setItemActive,
                    }}
                  >
                    <SidebarContentItem sidebarItem={sidebarItem} />
                  </SidebarContext.Provider>
                </div>
              ))}

              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Spinner className="size-6" />
                </div>
              ) : (
                <SidebarProfile />
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu className="mb-2">
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton asChild className="hover:bg-black/10">
                  <div className="group-data-[collapsible=icon]:size-10! h-auto cursor-pointer">
                    <Menu style={{ width: 24, height: 24 }} />
                    <span className="ml-1 text-base font-normal text-(--text-primary)">
                      Xem thêm
                    </span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-70 ml-3 rounded-xl bg-sidebar drop-shadow-lg">
                <DropdownMenuGroup className="p-2">
                  {sidebarMores.map((item) => (
                    <div key={item.id}>
                      <DropMenuSidebarMeta item={item} />
                    </div>
                  ))}
                </DropdownMenuGroup>
                <div className="bg-black/5 h-1.5"></div>
                <DropdownMenuGroup>
                  <DropdownMenuItem className="p-2 hover:outline-none">
                    <div className="p-4 rounded-lg hover:bg-black/10 cursor-pointer">
                      <span className="ml-1 text-base font-normal text-(--text-primary)">
                        Chuyển tài khoản
                      </span>
                    </div>
                  </DropdownMenuItem>
                  <div className="bg-black/5 h-[2px]"></div>
                  <DropdownMenuItem className="p-2 hover:outline-none">
                    <div className="p-4 rounded-lg hover:bg-red-600/10 cursor-pointer">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="ml-1 text-base text-red-500 font-medium cursor-pointer"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton asChild className="hover:bg-black/10">
                  <div className="group-data-[collapsible=icon]:size-10! h-auto cursor-pointer">
                    <LayoutPanelTop style={{ width: 24, height: 24 }} />
                    <span className="ml-1 text-base font-normal text-(--text-primary)">
                      Cũng của Meta
                    </span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-70 ml-3 rounded-xl bg-sidebar drop-shadow-lg">
                <DropdownMenuGroup className="p-2">
                  {sidebarMetas.map((item) => (
                    <div key={item.id}>
                      <DropMenuSidebarMeta item={item} />
                    </div>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
