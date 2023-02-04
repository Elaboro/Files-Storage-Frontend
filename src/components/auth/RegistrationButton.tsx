import React,
{
  FC,
  useRef,
  useState,
} from "react";
import {
  Button,
  FormControl,
  FormLabel,
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

const RegistrationButton: FC = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const handleClick = () => setIsShowPassword(!isShowPassword);

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button colorScheme='blue' variant='outline' onClick={onOpen}>
        Регистрация
      </Button>

      <Modal
        isCentered
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay backdropFilter='blur(3px)' />
        <ModalContent>
          <ModalHeader>Создать аккаунт</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>

            <FormControl isRequired mt={4}>
              <FormLabel>Username</FormLabel>
              <Input ref={initialRef} placeholder='username' />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>E-mail</FormLabel>
              <Input placeholder='e-mail' />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Password</FormLabel>
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  type={isShowPassword ? 'text' : 'password'}
                  placeholder='password'
                />
                <InputRightElement width='7rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {isShowPassword ? 'скрыть' : 'показать'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Зарегистрировать
            </Button>
            <Button onClick={onClose}>Отмена</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RegistrationButton;