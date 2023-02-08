import {
  createContext,
  Dispatch,
  SetStateAction
} from "react";

export interface AuthContextProps {
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  isAuth: boolean;
};

export const AuthContext = createContext<AuthContextProps>({
  setIsAuth: () => undefined,
  isAuth: false,
});