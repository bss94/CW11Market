import mongoose, {Model} from 'mongoose';

export interface UserFields {
  username: string;
  password: string;
  name: string;
  phone: string;
  token: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;

  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;