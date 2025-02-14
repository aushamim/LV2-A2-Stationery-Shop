export const USER_ROLE = {
  ADMIN: "admin",
  USER: "user",
} as const;

export interface UserInterface {
  name: string;
  email: string;
  password: string;
  address?: string;
  phone?: string;
  role?: (typeof USER_ROLE)[keyof typeof USER_ROLE];
  inactive?: boolean;
}

export interface UserPartialInterface {
  name?: string;
  email?: string;
  password?: string;
  address?: string;
  phone?: string;
  role?: (typeof USER_ROLE)[keyof typeof USER_ROLE];
  inactive?: boolean;
}

export interface UserLoginInterface {
  email: string;
  password: string;
}

export interface UserGetInterface {
  _id?: string;
  email?: string;
}
