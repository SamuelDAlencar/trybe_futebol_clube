import { TTeam, TUser } from '../entities';

export interface IRole {
  role: 'admin' | 'user'
}

export interface TToken {
  token: string;
}

export interface IService {
  login(data: TUser): Promise<TToken>;
  validateRole(token: string): Promise<IRole>;
}

export interface IModel {
  findOneByEmail(email: string): Promise<TUser>;
}

export interface TeamModel {
  findAll(): Promise<TTeam[]>;
  findOne(id: number): Promise<TTeam>;
}

export interface ITeamService {
  getTeams(): Promise<TTeam[]>;
  getTeamById(id: number): Promise<TTeam>;
}
