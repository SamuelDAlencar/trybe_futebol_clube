import { Request, Response } from 'express';
import { ILeaderboardService } from '../interfaces';

export default class LeaderboardController {
  constructor(private service: ILeaderboardService) {
    this.service = service;
  }

  async getLeaderboard(req: Request, res: Response) {
    const leaderBoard = await this.service.getLeaderboard();

    return res.status(200).json(leaderBoard);
  }
}
