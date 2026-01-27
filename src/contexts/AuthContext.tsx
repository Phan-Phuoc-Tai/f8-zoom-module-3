import { createContext, type Dispatch, type SetStateAction } from "react";

interface AuthContextType {
  triggerRegister: boolean;
  setTriggerRegister: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
