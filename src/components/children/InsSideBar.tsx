import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
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
  SidebarProvider,
  SidebarTrigger,
} from "../ui/sidebar";
import {
  AtSign,
  Bookmark,
  Circle,
  Compass,
  Grid2x2Plus,
  Heart,
  House,
  LayoutPanelTop,
  Menu,
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
const sidebarMenus = [
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
];

const mores = [
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
];

const metas = [
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
];

export default function InsSideBar() {
  return (
    <SidebarProvider>
      <Sidebar
        collapsible="icon"
        className="w-50 group-data-[collapsible=icon]:w-15 group-data-[side=left]:border-0"
      >
        <SidebarHeader>
          <SidebarTrigger className="cursor-pointer size-10 hover:bg-black/10" />
        </SidebarHeader>
        <SidebarContent className="justify-center">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-2">
                {sidebarMenus.map((sidebarItem) => (
                  <SidebarMenuItem key={sidebarItem.id}>
                    <SidebarMenuButton asChild className="hover:bg-black/10">
                      <a
                        href={sidebarItem.url}
                        className="group-data-[collapsible=icon]:size-10! h-auto"
                      >
                        <sidebarItem.icon style={{ width: 24, height: 24 }} />
                        <span className="ml-1 text-base font-normal text-(--text-primary)">
                          {sidebarItem.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton asChild className="hover:bg-black/10">
                    <a
                      href="#"
                      className="group-data-[collapsible=icon]:size-10! h-auto"
                    >
                      <Menu style={{ width: 24, height: 24 }} />
                      <span className="ml-1 text-base font-normal text-(--text-primary)">
                        Xem thêm
                      </span>
                    </a>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-70 ml-3 rounded-xl bg-sidebar drop-shadow-lg">
                  <DropdownMenuGroup className="p-2">
                    {mores.map((item) => (
                      <DropdownMenuSub key={item.id}>
                        <DropdownMenuSubTrigger className="hover:outline-none">
                          <a
                            href={item.url}
                            className="flex items-center gap-2 p-4  rounded-lg hover:bg-black/10 cursor-pointer"
                          >
                            <item.icon style={{ width: 24, height: 24 }} />
                            <span className="ml-1 text-base font-normal text-(--text-primary)">
                              {item.title}
                            </span>
                          </a>
                        </DropdownMenuSubTrigger>
                      </DropdownMenuSub>
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
                      <div className="p-4 rounded-lg hover:bg-black/10 cursor-pointer">
                        <span className="ml-1 text-base font-normal text-(--text-primary)">
                          Đăng xuất
                        </span>
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
                    <a
                      href="#"
                      target="_blank"
                      className="group-data-[collapsible=icon]:size-10! h-auto"
                    >
                      <LayoutPanelTop style={{ width: 24, height: 24 }} />
                      <span className="ml-1 text-base font-normal text-(--text-primary)">
                        Cũng của Meta
                      </span>
                    </a>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-70 ml-3 rounded-xl bg-sidebar drop-shadow-lg">
                  <DropdownMenuGroup className="p-2">
                    {metas.map((item) => (
                      <DropdownMenuSub key={item.id}>
                        <DropdownMenuSubTrigger className="hover:outline-none">
                          <a
                            href={item.url}
                            className="flex items-center gap-2 p-4  rounded-lg hover:bg-black/10 cursor-pointer"
                          >
                            <item.icon style={{ width: 24, height: 24 }} />
                            <span className="ml-1 text-base font-normal text-(--text-primary)">
                              {item.title}
                            </span>
                          </a>
                        </DropdownMenuSubTrigger>
                      </DropdownMenuSub>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
