import { createContext, useState, ReactNode } from "react";
import { User, AuthenticationState } from "../contracts";

type AuthState = {
  token: string | undefined;
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
  currentUser: User | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  state: AuthenticationState;
  setState: React.Dispatch<React.SetStateAction<AuthenticationState>>;
};

export const AuthContext = createContext<AuthState>({
  token: undefined,
  setToken: () => {},
  currentUser: undefined,
  state: "unauthenticated",
  setCurrentUser: () => {},
  setState: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [token, setToken] = useState<string>();
  const [state, setState] = useState<AuthenticationState>("unauthenticated");

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        currentUser,
        setCurrentUser,
        state,
        setState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
