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
