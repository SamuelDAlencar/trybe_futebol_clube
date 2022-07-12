import { TTeam } from '../entities';
import { TeamModel, ITeamService } from '../interfaces';

export default class TeamService implements ITeamService {
  constructor(private model: TeamModel) {
    this.model = model;
  }

  async getTeams(): Promise<TTeam[]> {
    const teams = await this.model.findAll();

    return teams;
  }
}
