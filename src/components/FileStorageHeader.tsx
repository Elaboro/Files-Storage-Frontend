import React from "react";
import {
  Icon,
  Text,
} from "@chakra-ui/react";
import { AiFillDatabase } from "react-icons/ai";

const FileStorageHeader = () => {
  return (
    <Text
      fontSize='6xl'
      fontWeight="bold"
      textAlign="center"
      background="linear-gradient(2deg, #013f6a 33%, #70b5ff 66%, #a9bfdf)"
      style={{
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}

      display="flex"
      justifyContent="center"
      alignItems="center"
    >

      <Icon maxH={"100vh"} as={AiFillDatabase} color={"#0B2349"} />
      Files Storage

    </Text>
  );
};

export default FileStorageHeader;