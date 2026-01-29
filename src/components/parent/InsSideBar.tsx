import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
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
import {
  Compass,
  Heart,
  House,
  LayoutPanelTop,
  Menu,
  PlusSquare,
  Search,
  Send,
} from "lucide-react";

import { useSidebarStore } from "../../stores/sidebarStore";
import DropMenuSidebarMeta from "../children/sidebar/DropMenuSidebarMeta";
import { useAuthStore } from "../../stores/authStore";
import { Spinner } from "../ui/spinner";
import SidebarProfile from "../children/sidebar/SidebarProfile";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import CreatePost from "../children/post/CreatePost";

export default function InsSideBar() {
  const { sidebarMores, sidebarMetas } = useSidebarStore();
  const { isLoading, logout } = useAuthStore();
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const handleLogout = () => {
    if (logout) {
      logout();
    }
  };
  return (
    <>
      <Sidebar
        collapsible="icon"
        className="w-50 group-data-[collapsible=icon]:w-15"
      >
        <SidebarHeader>
          <NavLink
            to={"/"}
            className="h-15 w-30 flex items-center justify-center mx-auto mt-5 select-none"
          >
            <img src="/images/ins-logo.svg" />
          </NavLink>
        </SidebarHeader>
        <SidebarContent className="justify-center">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-2">
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="hover:bg-black/10">
                    <NavLink
                      to={"/"}
                      className="group-data-[collapsible=icon]:size-10! h-12"
                    >
                      <House style={{ width: 24, height: 24 }} />
                      <span className="ml-1 text-base font-normal text-(--text-primary)">
                        Trang chủ
                      </span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="hover:bg-black/10">
                    <div className="group-data-[collapsible=icon]:size-10! h-12 cursor-pointer">
                      <Send style={{ width: 24, height: 24 }} />
                      <span className="ml-1 text-base font-normal text-(--text-primary)">
                        Tin nhắn
                      </span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="hover:bg-black/10">
                    <div className="group-data-[collapsible=icon]:size-10! h-12 cursor-pointer">
                      <Search style={{ width: 24, height: 24 }} />
                      <span className="ml-1 text-base font-normal text-(--text-primary)">
                        Tìm kiếm
                      </span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="hover:bg-black/10">
                    <NavLink
                      to={"/explore"}
                      className="group-data-[collapsible=icon]:size-10! h-12 "
                    >
                      <Compass style={{ width: 24, height: 24 }} />
                      <span className="ml-1 text-base font-normal text-(--text-primary)">
                        Khám phá
                      </span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="hover:bg-black/10">
                    <div className="group-data-[collapsible=icon]:size-10! h-12 cursor-pointer">
                      <Heart style={{ width: 24, height: 24 }} />
                      <span className="ml-1 text-base font-normal text-(--text-primary)">
                        Thông báo
                      </span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="hover:bg-black/10">
                    <div
                      className="group-data-[collapsible=icon]:size-10! h-12 cursor-pointer"
                      onClick={() => setOpenCreatePost(true)}
                    >
                      <PlusSquare style={{ width: 24, height: 24 }} />
                      <span className="ml-1 text-base font-normal text-(--text-primary)">
                        Tạo
                      </span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {isLoading ? (
                  <div className="flex items-center justify-center h-12">
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
                      <div className="p-4 rounded-lg w-full hover:bg-black/10 cursor-pointer">
                        <span className="ml-1 text-base font-normal text-(--text-primary)">
                          Chuyển tài khoản
                        </span>
                      </div>
                    </DropdownMenuItem>
                    <div className="bg-black/5 h-[2px]"></div>
                    <DropdownMenuItem className="p-2 hover:outline-none">
                      <div className="p-4 rounded-lg w-full hover:bg-red-600/10 cursor-pointer">
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
      {openCreatePost && <CreatePost setOpenCreatePost={setOpenCreatePost} />}
    </>
  );
}
