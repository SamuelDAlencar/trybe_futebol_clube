import { TLeaderboard, TMatch, TTeam } from '../types';

const createLeaderboard = (team: TTeam, match: TMatch, currentTeam: TLeaderboard): TLeaderboard => {
  const teamLeaderboard = currentTeam;

  if (team.id === match.awayTeam) {
    teamLeaderboard.goalsFavor += match.awayTeamGoals;
    teamLeaderboard.goalsOwn += match.homeTeamGoals;

    if (match.awayTeamGoals > match.homeTeamGoals) {
      teamLeaderboard.totalPoints += 3;
      teamLeaderboard.totalVictories += 1;
    } else if (match.awayTeamGoals < match.homeTeamGoals) { teamLeaderboard.totalLosses += 1; }
  } else if (team.id === match.homeTeam) {
    teamLeaderboard.goalsOwn += match.awayTeamGoals;
    teamLeaderboard.goalsFavor += match.homeTeamGoals;

    if (match.awayTeamGoals < match.homeTeamGoals) {
      teamLeaderboard.totalPoints += 3;
      teamLeaderboard.totalVictories += 1;
    } else if (match.awayTeamGoals > match.homeTeamGoals) { teamLeaderboard.totalLosses += 1; }
  }

  if (match.awayTeamGoals === match.homeTeamGoals) { teamLeaderboard.totalPoints += 1; }

  return teamLeaderboard;
};

const leaderboardTemplate = (teamName: string) => ({
  name: teamName,
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
});

export { leaderboardTemplate,
  createLeaderboard,
};
