import axios from "axios";
import jwtDecode,
{
  JwtPayload,
} from "jwt-decode";

const API_URL = process.env.REACT_APP_API_URL;

export class User {
  id: number;
  username: string;
  email: string;

  constructor(payload: UserPayload) {
    this.id = payload.id;
    this.username = payload.username;
    this.email = payload.email;
  }
};

type UserPayload = User & JwtPayload;

interface AuthResponse {
  token: string;
}

interface UserLoginData {
  username: string;
  password?: string;
  email?: string;
}

interface UserCreateData {
  username: string;
  password: string;
  email: string;
}

export default class AuthService {

  static async authCheck(): Promise<boolean> {
    const authStatus = (sessionStorage.getItem("auth") === "true")
    return authStatus;
  }

  static async login(data: UserLoginData): Promise<User> {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, data);
    return this.authorize(response.data.token);
  }

  static async register(data: UserCreateData): Promise<User> {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/register`, data);
    return this.authorize(response.data.token);
  }

  static loggedIn(user: User): void {
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("auth", "true");
  }

  static loggedOut(): void {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("auth");
  }

  static getTokenAuthorization(): string {
    return sessionStorage.getItem("token") || "";
  }

  private static authorize(token: string): User {
    sessionStorage.setItem("token", "Bearer " + token);
    const user_payload: UserPayload = jwtDecode(token);
    return new User(user_payload);
  }

}