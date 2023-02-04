import React,
{
  FC,
  ReactNode,
} from "react";
import { HStack } from "@chakra-ui/react";

interface IMenu {
  children?: ReactNode;
}

const Menu: FC<IMenu> = ({
  children
}) => {
  return (
    <HStack
      borderWidth={1}
      padding={3}
      borderRadius={12}
      marginTop={3}
      marginBottom={3}
    >
      {children}
    </HStack>
  );
};

export default Menu;