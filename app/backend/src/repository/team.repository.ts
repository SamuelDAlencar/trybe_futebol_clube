import Model from '../database/models/teams';
import { TeamModel } from '../interfaces';
import { TTeam } from '../entities';

export default class Repository implements TeamModel {
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
