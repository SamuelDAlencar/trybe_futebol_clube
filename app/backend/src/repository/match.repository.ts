import Model from '../database/models/matches';
import TeamModel from '../database/models/teams';
import { IMatchModel } from '../interfaces';
import { TMatch } from '../types';

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
}
