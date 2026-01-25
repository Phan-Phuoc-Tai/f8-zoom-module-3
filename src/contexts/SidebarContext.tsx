import { createContext } from "react";

interface SidebarContextType {
  itemActive: number;
  setItemActive: (newItem: number) => void;
}

export const SidebarContext = createContext<SidebarContextType | null>(null);
