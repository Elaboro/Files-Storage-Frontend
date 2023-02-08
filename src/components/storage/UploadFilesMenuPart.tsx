import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import React,
{
  FC,
  useRef,
} from "react";
import ModalDefault from "../ui/modal/ModalDefault";

const UploadFilesMenuPart: FC = () => {
  const disclosure = useDisclosure();
  const initialRef = useRef(null);

  const copyClick = () => { };
  const onUpload = () => { };

  const RegistrationForm = (<>
    <FormControl isRequired>
      <FormLabel>32-байтовый ключ</FormLabel>

      <HStack>
        <InputGroup size='md'>
          <Input ref={initialRef} placeholder='jZ39Sigy2VR2nmMQk7gbP2uDpR4czooD' />
          <InputRightElement width='8rem'>
            <Button h='1.75rem' size='sm' onClick={copyClick}>
              Скопировать
            </Button>
          </InputRightElement>
        </InputGroup>

        <Button width='10rem' colorScheme='blue' >
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