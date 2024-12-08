export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photo?: string;
  online?: boolean;
};

export type PartialUser = Partial<User>;