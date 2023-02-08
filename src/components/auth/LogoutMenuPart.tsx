import React,
{
  FC,
  useContext,
} from "react";
import { Button } from "@chakra-ui/react";
import AuthService from "../../api/AuthService";
import {
  AuthContext,
  AuthContextProps,
} from "../../context";

const LogoutMenuPart: FC = () => {
  const {
    setIsAuth,
  } = useContext<AuthContextProps>(AuthContext);

  const logout = () => {
    AuthService.loggedOut();
    setIsAuth(false);
  }

  return (
    <Button colorScheme='blue' variant='outline' onClick={logout}>
      Выход
    </Button>
  );
};

export default LogoutMenuPart;