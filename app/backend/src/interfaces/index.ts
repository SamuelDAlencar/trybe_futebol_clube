import { TUser } from '../entities';

export interface IService {
  login(data: TUser): Promise<string | boolean>;
  validateRole(token: string): Promise<IRole>;
}

export interface IModel {
  findOneByEmail(email: string): Promise<TUser>;
}

export interface IRole {
  role: 'admin' | 'user'
}
