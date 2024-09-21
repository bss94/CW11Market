export interface User {
  _id: string;
  username: string;
  name:string;
  phone:string;
  token: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface Category {
  _id: string;
  title: string;
}
export interface Author{
  _id:string;
  name:string;
  phone:string;
}
export interface Product{
  _id: string;
  author: string;
  category: Category;
  title: string;
  description: string;
  price: number;
  image:string;
}
export interface OneProduct{
  _id: string;
  author: Author;
  category: Category;
  title: string;
  description: string;
  price: number;
  image:string;
}