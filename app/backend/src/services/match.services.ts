import { TMatch, TMatchUpdate } from '../types';
import { IMatchModel, IMatchService } from '../interfaces';

export default class MatchService implements IMatchService {
  constructor(private model: IMatchModel) {
    this.model = model;
  }

  async getAllMatches(): Promise<TMatch[]> {
    const matches = await this.model.findAll();

    return matches;
  }

  async postMatch(data: TMatch): Promise<TMatch> {
    const match = await this.model.postMatch(data);
    match.inProgress = true;

    return match;
  }

  async finishMatch(id: number): Promise<void> {
    await this.model.finishMatch(id);
  }

  async updateMatch(id: number, update: TMatchUpdate): Promise<void> {
    const awayTeamGoals = Number(update.awayTeamGoals);
    const homeTeamGoals = Number(update.homeTeamGoals);

    await this.model.updateMatch(id, { awayTeamGoals, homeTeamGoals });
  }
}
