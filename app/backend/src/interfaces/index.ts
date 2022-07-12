import { TRole, TTeam, TToken, TUser } from '../types';

export interface IUserService {
  login(data: TUser): Promise<TToken>;
  validateRole(token: string): Promise<TRole>;
}

export interface IUserModel {
  findOneByEmail(email: string): Promise<TUser>;
}

export interface ITeamModel {
  findAll(): Promise<TTeam[]>;
  findOne(id: number): Promise<TTeam>;
}

export interface ITeamService {
  getTeams(): Promise<TTeam[]>;
  getTeamById(id: number): Promise<TTeam>;
}
