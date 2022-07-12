import { TTeam, TUser } from '../entities';

export interface IService {
  login(data: TUser): Promise<string | boolean>;
  validateRole(token: string): Promise<IRole>;
}

export interface IModel {
  findOneByEmail(email: string): Promise<TUser>;
}

export interface TeamModel {
  findAll(): Promise<TTeam[]>;
}

export interface ITeamService {
  getTeams(): Promise<TTeam[]>;
}

export interface IRole {
  role: 'admin' | 'user'
}
