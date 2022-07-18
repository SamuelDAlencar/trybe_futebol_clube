export type TUser = {
  id?: number;
  username?: string;
  role?: string;
  email: string;
  password: string;
};

export type TTeam = {
  id?: number;
  teamName: string;
};

export type TToken = {
  token: string;
};

export type TRole = {
  role: 'admin' | 'user'
};

export type TMatch = {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress?: boolean | number;
  teamHome?: string;
  teamAway?: string;
};

export type TMatchUpdate = {
  homeTeamGoals: number;
  awayTeamGoals: number;
};
