import * as React from "react";
import {
  Container,
} from "@chakra-ui/react";
import FilesStorage from "./pages/FilesStorage";
import FileStorageHeader from "./components/FileStorageHeader";

export const App = () => (
  <div className="App">
    <Container maxW='container.lg'>

      <FileStorageHeader />
      <FilesStorage />

    </Container>
  </div>
);
