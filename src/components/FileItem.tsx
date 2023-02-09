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
  CardHeader,
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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  AiFillFileUnknown,
  AiOutlineClose,
  AiOutlineDownload,
} from "react-icons/ai";
import {
  FaRegUserCircle,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi"
import {
  FileData,
  FileDeleteResponse,
} from "../api/type/type";
import {
  AuthContext,
  AuthContextProps,
} from "../context";
import FileStorageService from "../api/FileStorageService";
import ModalDefault from "./ui/modal/ModalDefault";

const FileItem: FC<{
  file_data: FileData,
  onDeleteFile: (file_data: FileDeleteResponse) => void,
}> = ({
  file_data,
  onDeleteFile,
}) => {
  const {
    isAuth,
  } = useContext<AuthContextProps>(AuthContext);

  const toast = useToast();
  const [key, setKey] = useState<string>("");

  const onDelete = async (file_data: FileData) => {
    const file_data_deleted = await FileStorageService.delete(file_data.id);
    onDeleteFile(file_data_deleted);
  };

  const disclosureDownload = useDisclosure();
  const initialRefDownload = useRef(null);

  const onDownload = async (file_data: FileData) => {
    try {
      await FileStorageService.download({
        id: file_data.id,
        key
      });
    } catch(e: any) {
      const data_error = JSON.parse(await new Response(e?.response?.data).text()) as Error;
      toast({
        title: `Не удалось скачать: ${data_error?.message}`,
        status: "error",
        isClosable: true,
      })
    }

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
      <Card minHeight={"100%"} variant={"filled"}>

        <CardHeader paddingBottom={0}>
          <Flex>
            <Center><FaRegUserCircle size={15} /></Center>
            <Container
              paddingLeft={"5px"}
              display="inline-block"
              alignSelf={"center"}
            >
              <Text
                fontSize='lg'
                wordBreak={"break-word"}
                overflow="hidden"
                textOverflow="ellipsis"
                display="-webkit-box"
                style={{
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical"
                }}
              >{file_data.username}</Text>
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

        </CardHeader>

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
                    <Text
                      fontWeight={"bold"}
                      color={"#23477e"}
                      wordBreak={"break-word"}
                      overflow="hidden"
                      textOverflow="ellipsis"
                      display="-webkit-box"
                      style={{
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical"
                      }}
                    >{file_data.filename}</Text>
                  </Center>
                </GridItem>
              </Grid>
            </Container>
          </Flex>
        </CardBody>
      </Card>
    </div>
  );
};

export default FileItem;