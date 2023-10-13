import { useContext } from "react";
import { AuthContext } from "../contexts";
import { Role, User } from "../contracts";
import { AuthService } from "../services";

const useAuth = () => {
  const { currentUser, setCurrentUser, state, setState, setToken } =
    useContext(AuthContext);

  const login = async (username: string, password: string) => {
    setState("loading");

    AuthService.login(username, password).then((data) => {
      const { token, user } = data;

      if (token) {
        setState("authenticated");
        setCurrentUser(user);
        setToken(token);
      }
    });
  };

  const register = async (
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
    role: Role
  ) => {
    setState("loading");

    const user: User = await AuthService.register(
      username,
      password,
      email,
      firstName,
      lastName,
      role
    );

    if (user) {
      setState("authenticated");
      setCurrentUser(user);
    }
  };

  const logout = async () => {
    setState("unauthenticated");
    setCurrentUser(undefined);
  };

  return { login, logout, register, currentUser, state };
};

export default useAuth;
