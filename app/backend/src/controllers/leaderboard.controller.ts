import { Request, Response } from 'express';
import { ILeaderboardService } from '../interfaces';

export default class LeaderboardController {
  constructor(private service: ILeaderboardService) {
    this.service = service;
  }

  async getHomeLeaderboard(req: Request, res: Response) {
    const leaderBoard = await this.service.getHomeLeaderboard();

    return res.status(200).json(leaderBoard);
  }

  async getAwayLeaderboard(req: Request, res: Response) {
    const leaderBoard = await this.service.getAwayLeaderboard();

    return res.status(200).json(leaderBoard);
  }
}
