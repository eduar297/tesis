export type Role = "student" | "professor";

export type User = {
  _id: string;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  createdAt: Date;
};

export type AuthenticationState =
  | "authenticated"
  | "unauthenticated"
  | "loading";
