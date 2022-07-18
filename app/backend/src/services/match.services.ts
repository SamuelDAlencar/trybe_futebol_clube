import { TMatch } from '../types';
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
}
