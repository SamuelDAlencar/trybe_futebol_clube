import { TRole, TTeam, TToken, TUser, TMatch, TMatchUpdate, TLeaderboard } from '../types';

// User Files
export interface IUserModel {
  findByEmail(email: string): Promise<TUser>;
}

export interface IUserService {
  login(data: TUser): Promise<TToken>;
  validateRole(token: string): Promise<TRole>;
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
  findById(id: number): Promise<TMatch>;
  postMatch(data: TMatch): Promise<TMatch>;
  finishMatch(id: number): Promise<void>;
  updateMatch(id: number, update: TMatchUpdate): Promise<void>;
}

export interface IMatchService {
  getAllMatches(): Promise<TMatch[]>;
  postMatch(data: TMatch): Promise<TMatch>;
  finishMatch(id: number): Promise<void>;
  updateMatch(id: number, update: TMatchUpdate): Promise<void>;
}

export interface ILeaderboardModel {
  findAllTeams(): Promise<TTeam[]>;
  findAllMatches(): Promise<TMatch[]>;
}

export interface ILeaderboardService {
  getLeaderboard(): Promise<TLeaderboard[]>;
  getHomeLeaderboard(): Promise<TLeaderboard[]>;
  getAwayLeaderboard(): Promise<TLeaderboard[]>;
}
