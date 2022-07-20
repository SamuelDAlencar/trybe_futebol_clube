import { TLeaderboard } from '../types';
import { ILeaderboardModel, ILeaderboardService } from '../interfaces';
import {
  createAwayLB,
  createHomeLB,
  leaderboardTemplate,
  sortLeaderboard,
} from '../utils/createLeaderboard';

export default class LeaderboardService implements ILeaderboardService {
  constructor(private model: ILeaderboardModel) {
    this.model = model;
  }

  async getHomeLeaderboard(): Promise<TLeaderboard[]> {
    const matches = await this.model.findAllMatches();
    const teams = await this.model.findAllTeams();
    const leaderboard: TLeaderboard[] = [];

    teams.forEach((team, i) => {
      leaderboard[i] = leaderboardTemplate(team.teamName);

      matches.forEach((match) => {
        if (match.inProgress === 0 && team.id === match.homeTeam) {
          leaderboard[i] = createHomeLB(team, match, leaderboard[i]);
        }
      });

      leaderboard[i].efficiency = Number(((leaderboard[i].totalPoints
        / (leaderboard[i].totalGames * 3)) * 100).toFixed(2));

      leaderboard[i].goalsBalance = leaderboard[i].goalsFavor - leaderboard[i].goalsOwn;
    });

    return sortLeaderboard(leaderboard);
  }

  async getAwayLeaderboard(): Promise<TLeaderboard[]> {
    const matches = await this.model.findAllMatches();
    const teams = await this.model.findAllTeams();
    const leaderboard: TLeaderboard[] = [];

    teams.forEach((team, i) => {
      leaderboard[i] = leaderboardTemplate(team.teamName);

      matches.forEach((match) => {
        if (match.inProgress === 0 && team.id === match.awayTeam) {
          leaderboard[i] = createAwayLB(team, match, leaderboard[i]);
        }
      });

      leaderboard[i].efficiency = Number(((leaderboard[i].totalPoints
        / (leaderboard[i].totalGames * 3)) * 100).toFixed(2));

      leaderboard[i].goalsBalance = leaderboard[i].goalsFavor - leaderboard[i].goalsOwn;
    });

    return sortLeaderboard(leaderboard);
  }
}
