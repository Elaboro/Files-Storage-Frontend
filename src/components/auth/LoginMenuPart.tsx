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
import AuthService,
{
  User
} from "../../api/AuthService";
import {
  AuthContext,
  AuthContextProps,
} from "../../context";
import ModalDefault from "../ui/modal/ModalDefault";

const LoginMenuPart: FC = () => {
  const {
    setIsAuth,
  } = useContext<AuthContextProps>(AuthContext);

  const disclosure = useDisclosure();
  const initialRef = useRef(null);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const handleClick = () => setIsShowPassword(!isShowPassword);

  const onLogin = async () => {
    const user = await AuthService.login({
      username,
      password,
    });

    loggedIn(user);

    setUsername("");
    setPassword("");

    disclosure.onClose();
  };

  const loggedIn = (user: User) => {
    if (user) {
      AuthService.loggedIn(user);

      setIsAuth(true);
    }
  };

  const LoginForm = (<>
    <FormControl>
      <FormLabel>Username or e-mail</FormLabel>
      <Input
        ref={initialRef}
        placeholder='username or e-mail'
        value={username}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
      />
    </FormControl>

    <FormControl mt={4}>
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
      <Button colorScheme='blue' variant='solid' onClick={disclosure.onOpen}>
        Авторизация
      </Button>
      <ModalDefault
        disclosure={disclosure}
        header="Войти в аккаунт"
        body={LoginForm}
        button_to_footer={[
          {
            name: "Войти",
            onClick: onLogin,
          },
        ]}
      />
    </>
  );
};

export default LoginMenuPart;