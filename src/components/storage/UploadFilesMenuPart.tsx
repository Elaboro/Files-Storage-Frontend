import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import React,
{
  ChangeEvent,
  FC,
  useRef,
  useState,
} from "react";
import ModalDefault from "../ui/modal/ModalDefault";
import CryptoJS from "crypto-js";
import UploadFilesPond from "../ui/UploadFilesPond";
import FileStorageService from "../../api/FileStorageService";
import { FileData } from "../../api/type/type";

interface UploadFilesMenuPartProps {
  onUploadedFile(file_list: FileData[]): void;
};

const UploadFilesMenuPart: FC<UploadFilesMenuPartProps> = ({
  onUploadedFile,
}) => {
  const disclosure = useDisclosure();
  const initialRef = useRef(null);
  const [keyAES, setKeyAES] = useState<string>("");
  const [tooltipCopyClickIsOpen, setTooltipCopyClickIsOpen] = useState<boolean>(false);
  const [fileListSelected, setFileListSelected] = useState<File[]>([]);

  const copyClick = async () => {
    navigator.clipboard.writeText(keyAES).then(
      () => {
        setTooltipCopyClickIsOpen(true)
        setTimeout(setTooltipCopyClickIsOpen, 1500, false);
      }
    );
  };
  const onUpload = async () => {
    const file_list = await FileStorageService.upload({
      key: keyAES,
      file_list: fileListSelected,
    });
    disclosure.onClose();
    onUploadedFile(file_list);
  };

  const onSelectedFile = async (file_list: File[]): Promise<void> => {
    setFileListSelected([
      ...fileListSelected,
      ...file_list,
    ]);
  };

  const onGenerateKey = () => {
    const key = CryptoJS.lib.WordArray.random(16).toString();
    setKeyAES(key);
  };

  const RegistrationForm = (<>
    <FormControl isRequired>
      <FormLabel>32-байтовый ключ</FormLabel>

      <HStack>
        <InputGroup size='md'>
          <Input
            ref={initialRef}
            placeholder='jZ39Sigy2VR2nmMQk7gbP2uDpR4czooD'
            value={keyAES}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setKeyAES(e.target.value)}
          />
          <InputRightElement width='8rem'>
            <Tooltip
              label='Скопировано'
              isOpen={tooltipCopyClickIsOpen}
            >
              <Button h='1.75rem' size='sm' onClick={copyClick}>
                Скопировать
              </Button>
            </Tooltip>
          </InputRightElement>
        </InputGroup>

        <Button width='10rem' colorScheme='blue' onClick={onGenerateKey}>
          Генерировать
        </Button>
      </HStack>

      <FormHelperText>Сохраните ключ, он потребуется, что бы скачать файл</FormHelperText>
    </FormControl>

    <FormControl mt={4}>
      <UploadFilesPond onSelectedFile={onSelectedFile} />
    </FormControl>
  </>);

  return (
    <>
      <Button colorScheme='blue' variant='solid' onClick={disclosure.onOpen}>
        Загрузить файлы
      </Button>
      <ModalDefault
        disclosure={disclosure}
        header="Загрузка файлов на сервер"
        body={RegistrationForm}
        contentMinW={625}
        button_to_footer={[
          {
            name: "Отправить",
            onClick: onUpload,
          },
        ]}
      />
    </>
  );
};

export default UploadFilesMenuPart;