import React, { FC } from "react";
import { Spacer } from "@chakra-ui/react";
import LoginButton from "./auth/LoginButton";
import LogoutButton from "./auth/LogoutButton";
import RegistrationButton from "./auth/RegistrationButton";
import UploadFilesButton from "./storage/UploadFilesButton";
import Menu from "./ui/Menu";

const TopMenu: FC = () => {
  return (
    <Menu>
      <LoginButton />
      <RegistrationButton />
      <LogoutButton />

      <Spacer />

      <UploadFilesButton />
    </Menu>
  );
};

export default TopMenu;
