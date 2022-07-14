import { TRole, TTeam, TToken, TUser, TMatch } from '../types';

// User Files
export interface IUserService {
  login(data: TUser): Promise<TToken>;
  validateRole(token: string): Promise<TRole>;
}

export interface IUserModel {
  findByEmail(email: string): Promise<TUser>;
}

// Team Files
export interface ITeamModel {
  findAll(): Promise<TTeam[]>;
  findById(id: number): Promise<TTeam>;
}

export interface ITeamService {
  getAllTeams(): Promise<TTeam[]>;
  getTeamById(id: number): Promise<TTeam>;
}

export interface IMatchModel {
  findAll(): Promise<TMatch[]>;
}

export interface IMatchService {
  getAllMatches(): Promise<TMatch[]>;
}
