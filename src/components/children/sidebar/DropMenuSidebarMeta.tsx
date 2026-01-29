import {
  DropdownMenuSub,
  DropdownMenuSubTrigger,
} from "@radix-ui/react-dropdown-menu";
import type { LucideIcon } from "lucide-react";

interface Props {
  item: {
    id: number;
    title: string;
    url: string;
    icon?: LucideIcon;
  };
}

export default function DropMenuSidebarMeta({ item }: Props) {
  const { title, url, icon: Icon } = item;
  return (
    <>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="hover:outline-none">
          <a
            href={url}
            className="flex items-center gap-2 p-4  rounded-lg hover:bg-black/10 cursor-pointer"
          >
            {Icon && <Icon style={{ width: 24, height: 24 }} />}
            <span className="ml-1 text-base font-normal text-(--text-primary)">
              {title}
            </span>
          </a>
        </DropdownMenuSubTrigger>
      </DropdownMenuSub>
    </>
  );
}
