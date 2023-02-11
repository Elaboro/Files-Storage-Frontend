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
import { FileData } from "./api/type/type";

export const App = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const authStatus = await AuthService.authCheck();
      setIsAuth(authStatus);
    })();
  }, []);

  const [file_data_list, setFileDataList] = useState<FileData[]>([]);
  const DontDoThat_OnUploadedFile = (file_list_uploaded: FileData[]): void => {
    setFileDataList([...file_data_list, ...file_list_uploaded]);
  };

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
    }}>
      <div className="App">
        <Container maxW='container.lg'>

          <FileStorageHeader />
          <TopMenu
            onUploadedFile={DontDoThat_OnUploadedFile}
          />
          <FilesStorage
            file_data_list={file_data_list}
            setFileDataList={setFileDataList}
          />

        </Container>
      </div>
    </AuthContext.Provider>
  );
}
