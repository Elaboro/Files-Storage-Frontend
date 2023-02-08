import React,
{
  useEffect,
  useState
} from "react";
import {
  Container,
} from "@chakra-ui/react";
import FilesStorage from "./pages/FilesStorage";
import FileStorageHeader from "./components/FileStorageHeader";
import TopMenu from "./components/TopMenu";
import { AuthContext } from "./context";
import AuthService from "./api/AuthService";

export const App = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const authStatus = await AuthService.authCheck();
      setIsAuth(authStatus);
    })();
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
    }}>
      <div className="App">
        <Container maxW='container.lg'>

          <FileStorageHeader />
          <TopMenu />
          <FilesStorage />

        </Container>
      </div>
    </AuthContext.Provider>
  );
}
