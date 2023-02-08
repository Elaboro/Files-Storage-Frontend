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

const UploadFilesMenuPart: FC = () => {
  const disclosure = useDisclosure();
  const initialRef = useRef(null);
  const [keyAES, setKeyAES] = useState<string>("");
  const [tooltipCopyClickIsOpen, setTooltipCopyClickIsOpen] = useState<boolean>(false);

  const copyClick = async () => {
    navigator.clipboard.writeText(keyAES).then(
      () => {
        setTooltipCopyClickIsOpen(true)
        setTimeout(setTooltipCopyClickIsOpen, 1500, false);
      }
    );
  };
  const onUpload = () => { };

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
      Add file
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