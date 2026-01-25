import { NavLink } from "react-router-dom";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { type LucideIcon } from "lucide-react";
import { use } from "react";
import { SidebarContext } from "../../contexts/SidebarContext";
import { cn } from "../../lib/utils";

interface Props {
  sidebarItem: {
    id: number;
    title: string;
    url: string;
    icon?: LucideIcon;
  };
}
export default function SidebarContentItem({ sidebarItem }: Props) {
  const { id, title, url, icon: Icon } = sidebarItem;
  const context = use(SidebarContext);
  const handleChangeActive = () => {
    if (title === "Trang chủ" || title === "Khám phá" || title === "Tin nhắn") {
      context?.setItemActive(id);
    }
  };
  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          className={cn(
            "hover:bg-black/10",
            context?.itemActive === id && "bg-black/10",
          )}
          onClick={handleChangeActive}
        >
          <NavLink
            to={url}
            className="group-data-[collapsible=icon]:size-10! h-auto"
          >
            {Icon && <Icon style={{ width: 24, height: 24 }} />}
            <span className="ml-1 text-base font-normal text-(--text-primary)">
              {title}
            </span>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </>
  );
}
