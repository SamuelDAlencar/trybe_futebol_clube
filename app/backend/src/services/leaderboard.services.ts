import { TLeaderboard } from '../types';
import { ILeaderboardModel, ILeaderboardService } from '../interfaces';
import { createLeaderboard, leaderboardTemplate } from '../utils/createLeaderboard';

export default class LeaderboardService implements ILeaderboardService {
  constructor(private model: ILeaderboardModel) {
    this.model = model;
  }

  async getLeaderboard(): Promise<TLeaderboard[]> {
    const matches = await this.model.findAllMatches();
    const teams = await this.model.findAllTeams();
    const leaderboard: TLeaderboard[] = [];

    teams.forEach((team, i) => {
      leaderboard[i] = leaderboardTemplate(team.teamName);

      matches.forEach((match) => {
        if (match.inProgress === 0 && (team.id === match.awayTeam || team.id === match.homeTeam)) {
          leaderboard[i] = createLeaderboard(team, match, leaderboard[i]);
          leaderboard[i].totalGames += 1;

          if (match.awayTeamGoals === match.homeTeamGoals) {
            leaderboard[i].totalPoints += 1
            leaderboard[i].totalDraws += 1
          };
        }
      });

      leaderboard[i].efficiency = Number(((leaderboard[i].totalPoints
        / (leaderboard[i].totalGames * 3)) * 100).toFixed(2));

      leaderboard[i].goalsBalance = leaderboard[i].goalsFavor - leaderboard[i].goalsOwn;
    });

    console.log(leaderboard.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor || a.goalsOwn - b.goalsOwn));

    return leaderboard.sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor || a.goalsOwn - b.goalsOwn);
  }
}
