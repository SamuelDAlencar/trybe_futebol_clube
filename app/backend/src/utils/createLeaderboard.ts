import { TLeaderboard, TMatch, TTeam } from '../types';

const createAwayLB = (team: TTeam, match: TMatch, currentTeam: TLeaderboard): TLeaderboard => {
  const teamLeaderboard = currentTeam;

  teamLeaderboard.goalsFavor += match.awayTeamGoals;
  teamLeaderboard.goalsOwn += match.homeTeamGoals;

  if (match.awayTeamGoals > match.homeTeamGoals) {
    teamLeaderboard.totalPoints += 3;
    teamLeaderboard.totalVictories += 1;
  } else if (match.awayTeamGoals < match.homeTeamGoals) {
    teamLeaderboard.totalLosses += 1;
  }

  teamLeaderboard.totalGames += 1;

  if (match.awayTeamGoals === match.homeTeamGoals) {
    teamLeaderboard.totalPoints += 1;
    teamLeaderboard.totalDraws += 1;
  }

  return teamLeaderboard;
};

const createHomeLB = (team: TTeam, match: TMatch, currentTeam: TLeaderboard): TLeaderboard => {
  const teamLeaderboard = currentTeam;

  teamLeaderboard.goalsOwn += match.awayTeamGoals;
  teamLeaderboard.goalsFavor += match.homeTeamGoals;

  if (match.awayTeamGoals < match.homeTeamGoals) {
    teamLeaderboard.totalPoints += 3;
    teamLeaderboard.totalVictories += 1;
  } else if (match.awayTeamGoals > match.homeTeamGoals) {
    teamLeaderboard.totalLosses += 1;
  }

  teamLeaderboard.totalGames += 1;

  if (match.awayTeamGoals === match.homeTeamGoals) {
    teamLeaderboard.totalPoints += 1;
    teamLeaderboard.totalDraws += 1;
  }

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

const sortLeaderboard = (leaderboard: TLeaderboard[]): TLeaderboard[] => leaderboard
  .sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor || a.goalsOwn - b.goalsOwn);

export { leaderboardTemplate, createHomeLB, createAwayLB, sortLeaderboard };
