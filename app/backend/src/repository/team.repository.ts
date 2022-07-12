import Model from '../database/models/teams';
import { ITeamModel } from '../interfaces';
import { TTeam } from '../types';

export default class Repository implements ITeamModel {
  constructor(private model = Model) {
    this.model = model;
  }

  async findAll(): Promise<TTeam[]> {
    const teams = await this.model.findAll();

    return teams as TTeam[];
  }

  async findOne(id: number): Promise<TTeam> {
    const team = await this.model.findByPk(id);

    return team as TTeam;
  }
}
