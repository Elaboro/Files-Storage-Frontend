import React,
{
  ChangeEvent,
  FC,
  useContext,
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
  useDisclosure,
} from "@chakra-ui/react";
import {
  AuthContext,
  AuthContextProps,
} from "../../context";
import AuthService,
{
  User,
} from "../../api/AuthService";
import ModalDefault from "../ui/modal/ModalDefault";

const RegistrationMenuPart: FC = () => {
  const {
    setIsAuth,
  } = useContext<AuthContextProps>(AuthContext);

  const disclosure = useDisclosure();
  const initialRef = useRef(null);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const handleClick = () => setIsShowPassword(!isShowPassword);

  const onRegistration = async () => {
    const user = await AuthService.register({
      username,
      password,
      email,
    });

    loggedIn(user);

    setUsername("");
    setPassword("");
    setEmail("");

    disclosure.onClose();
  };

  const loggedIn = (user: User) => {
    if (user) {
      AuthService.loggedIn(user);

      setIsAuth(true);
    }
  };

  const RegistrationForm = (<>
    <FormControl isRequired mt={4}>
      <FormLabel>Username</FormLabel>
      <Input
        ref={initialRef}
        placeholder='username'
        value={username}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
      />
    </FormControl>

    <FormControl isRequired mt={4}>
      <FormLabel>E-mail</FormLabel>
      <Input
        placeholder='e-mail'
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
      />
    </FormControl>

    <FormControl isRequired mt={4}>
      <FormLabel>Password</FormLabel>
      <InputGroup size='md'>
        <Input
          pr='4.5rem'
          type={isShowPassword ? 'text' : 'password'}
          placeholder='password'
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        <InputRightElement width='7rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick}>
            {isShowPassword ? 'скрыть' : 'показать'}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  </>);

  return (
    <>
      <Button colorScheme='blue' variant='outline' onClick={disclosure.onOpen}>
        Регистрация
      </Button>

      <ModalDefault
        disclosure={disclosure}
        header="Создать аккаунт"
        body={RegistrationForm}
        button_to_footer={[
          {
            name: "Зарегистрировать",
            onClick: onRegistration,
          },
        ]}
      />
    </>
  );
};

export default RegistrationMenuPart;