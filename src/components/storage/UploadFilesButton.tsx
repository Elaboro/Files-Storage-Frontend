import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React,
{
  FC,
  useRef,
} from "react";

const UploadFilesButton: FC = () => {
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const copyClick = () => {};

  return (
    <>
      <Button colorScheme='blue' variant='outline' onClick={onOpen}>
        Загрузить файлы
      </Button>

      <Modal
        isCentered
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay backdropFilter='blur(3px)' />
        <ModalContent
          minW={625}
        >
          <ModalHeader>Загрузка файлов на сервер</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>

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

          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Отправить
            </Button>
            <Button onClick={onClose}>Отмена</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UploadFilesButton;