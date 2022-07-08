export interface IUser {
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IService {
  login(data: ILogin): Promise<TToken>;
}

export interface IModel {
  login(
    data: ILogin
  ): Promise<IUser>;
}

export type TToken = string;
