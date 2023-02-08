import React,
{
  FC,
  useContext,
} from "react";
import { Spacer } from "@chakra-ui/react";
import LoginMenuPart from "./auth/LoginMenuPart";
import LogoutMenuPart from "./auth/LogoutMenuPart";
import RegistrationMenuPart from "./auth/RegistrationMenuPart";
import UploadFilesMenuPart from "./storage/UploadFilesMenuPart";
import Menu from "./ui/Menu";
import {
  AuthContext,
  AuthContextProps,
} from "../context";

const TopMenu: FC = () => {
  const { isAuth } = useContext<AuthContextProps>(AuthContext);

  return (
    <Menu>
      {isAuth
        ? <>
          <LogoutMenuPart />
          <Spacer />
          <UploadFilesMenuPart />
        </>
        : <>
          <LoginMenuPart />
          <RegistrationMenuPart />
        </>
      }
    </Menu>
  );
};

export default TopMenu;
