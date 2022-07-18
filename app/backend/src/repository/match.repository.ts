import Model from '../database/models/matches';
import TeamModel from '../database/models/teams';
import { IMatchModel } from '../interfaces';
import { TMatch, TMatchUpdate } from '../types';

export default class Repository implements IMatchModel {
  constructor(private model = Model) {
    this.model = model;
  }

  async findAll(): Promise<TMatch[]> {
    const matches = await this.model.findAll({
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

  async findById(id: number): Promise<TMatch> {
    const match = await this.model.findByPk(id);

    return match as TMatch;
  }

  async postMatch(data: TMatch): Promise<TMatch> {
    const fixedData = { ...data, inProgress: 1 };

    const match = await this.model.create(fixedData);

    return match;
  }

  async finishMatch(id: number): Promise<void> {
    await this.model.update({ inProgress: 0 }, { where: { id } });
  }

  async updateMatch(id: number, update: TMatchUpdate): Promise<void> {
    const { awayTeamGoals, homeTeamGoals } = update;

    await this.model.update({ awayTeamGoals, homeTeamGoals }, { where: { id } });
  }
}
