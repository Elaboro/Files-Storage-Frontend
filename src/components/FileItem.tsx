import React,
{
  ChangeEvent,
  FC,
  useContext,
  useRef,
  useState,
} from "react";
import {
  Card,
  CardBody,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import {
  AiFillFileUnknown,
  AiOutlineClose,
  AiOutlineDownload,
} from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi"
import { FileData } from "../api/type/type";
import {
  AuthContext,
  AuthContextProps,
} from "../context";
import FileStorageService from "../api/FileStorageService";
import ModalDefault from "./ui/modal/ModalDefault";

const FileItem: FC<{ file_data: FileData }> = ({
  file_data
}) => {
  const {
    isAuth,
  } = useContext<AuthContextProps>(AuthContext);

  const [key, setKey] = useState<string>("");

  const onDelete = async (file_data: FileData) => {
    await FileStorageService.delete(file_data.id);
  };

  const disclosureDownload = useDisclosure();
  const initialRefDownload = useRef(null);

  const onDownload = async (file_data: FileData) => {
    await FileStorageService.download({
      id: file_data.id,
      key
    });

    setKey("");
    disclosureDownload.onClose();
  };

  const disclosureDelete = useDisclosure();

  const MenuDownloadItem = (<>
    <MenuItem icon={<AiOutlineDownload size={20} />} onClick={disclosureDownload.onOpen}>
      Скачать
    </MenuItem>
    <ModalDefault
      disclosure={disclosureDownload}
      header="Скачивание файла"
      body={
        <>
          <FormControl>
            <FormLabel>32-байтовый ключ</FormLabel>
            <Input
              ref={initialRefDownload}
              placeholder='jZ39Sigy2VR2nmMQk7gbP2uDpR4czooD'
              value={key}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setKey(e.target.value)}
            />
          </FormControl>
        </>
      }
      button_to_footer={[
        {
          name: "Скачать",
          onClick: () => onDownload(file_data),
        },
      ]}
    />
  </>);

  const MenuDeleteItem = (<>
    <MenuItem icon={<AiOutlineClose size={20} />} onClick={disclosureDelete.onOpen}>
      Удалить
    </MenuItem>
    <ModalDefault
      disclosure={disclosureDelete}
      header="Удаление файла"
      body={
        <>
          <FormControl>
            <FormLabel>Вы хотите удалить файл?</FormLabel>
          </FormControl>
        </>
      }
      button_to_footer={[
        {
          name: "Удалить",
          onClick: () => onDelete(file_data),
        },
      ]}
    />
  </>);

  return (
    <div>
      <Tooltip placement='top' label={`Owner: ${file_data.username}`} bg='blue.400'>
        <Card>
          <CardBody>
            <Flex>

              <Container>
                <Grid>
                  <GridItem>
                    <Center>
                      <AiFillFileUnknown size={70} />
                    </Center>
                  </GridItem>
                  <GridItem>
                    <Center>
                      <Text>{file_data.filename}</Text>
                    </Center>
                  </GridItem>
                </Grid>
              </Container>

              {isAuth && <>
                <Spacer />

                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label='Options'
                    icon={<GiHamburgerMenu />}
                    variant='outline'
                  />
                  <MenuList>
                    {MenuDownloadItem}
                    {MenuDeleteItem}
                  </MenuList>
                </Menu>
              </>}
            </Flex>
          </CardBody>
        </Card>
      </Tooltip>
    </div>
  );
};

export default FileItem;