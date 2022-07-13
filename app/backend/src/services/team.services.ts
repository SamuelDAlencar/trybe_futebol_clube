import { TTeam } from '../types';
import { ITeamModel, ITeamService } from '../interfaces';

export default class TeamService implements ITeamService {
  constructor(private model: ITeamModel) {
    this.model = model;
  }

  async getAllTeams(): Promise<TTeam[]> {
    const teams = await this.model.findAll();

    return teams;
  }

  async getTeamById(id: number): Promise<TTeam> {
    const team = await this.model.findByPk(id);

    return team;
  }
}
