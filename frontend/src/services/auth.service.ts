import { Role, User } from "../contracts";

export const URL_BASE = "http://localhost:3000/users";

const login = async (username: string, password: string) => {
  const url = `${URL_BASE}/login`;

  const options: RequestInit = {
    method: "POST",
    headers: createHeaders(),
    body: JSON.stringify({ username, password }),
  };

  return fetch(url, options)
    .then((res) => res.json())
    .then((res: { user: User; token: string }) => {
      return res;
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
  const url = `${URL_BASE}/register`;

  const options: RequestInit = {
    method: "POST",
    headers: createHeaders(),
    body: JSON.stringify({
      username,
      password,
      email,
      firstName,
      lastName,
      role,
    }),
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const user: User = await response.json();

  return user;
};

const createHeaders = () => {
  return {
    "Content-Type": "application/json",
  };
};

export const AuthService = {
  login,
  register,
};
