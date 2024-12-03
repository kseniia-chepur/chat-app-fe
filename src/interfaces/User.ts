export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photo?: string;
};

export type PartialUser = Partial<User>;