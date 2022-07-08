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
  login(data: ILogin): Promise<string | boolean>;
}

export interface IModel {
  login(
    email: string
  ): Promise<IUser>;
}
