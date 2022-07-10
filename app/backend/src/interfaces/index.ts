import { TUser } from '../entities';

export interface IService {
  login(data: TUser): Promise<string | boolean>;
}

export interface IModel {
  login(email: string): Promise<TUser>;
}
