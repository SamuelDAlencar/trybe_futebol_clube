import TeamModel from '../database/models/teams';
import MatchModel from '../database/models/matches';
import { ILeaderboardModel } from '../interfaces';
import { TMatch, TTeam } from '../types';

export default class Repository implements ILeaderboardModel {
  constructor(private matchModel = MatchModel, private teamModel = TeamModel) {
    this.matchModel = matchModel;
    this.teamModel = teamModel;
  }

  async findAllTeams(): Promise<TTeam[]> {
    const teams = await this.teamModel.findAll();

    return teams as TTeam[];
  }

  async findAllMatches(): Promise<TMatch[]> {
    const matches = await this.matchModel.findAll({
      include: [{
        model: TeamModel,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: TeamModel,
        as: 'teamAway',
        attributes: ['teamName'],
      }],
    });

    return matches as TMatch[];
  }
}
