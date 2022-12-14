import { Request, Response } from 'express';
import { IMatchService } from '../interfaces';

export default class MatchController {
  constructor(private service: IMatchService) {
    this.service = service;
  }

  async getAllMatches(req: Request, res: Response) {
    const matches = await this.service.getAllMatches();

    return res.status(200).json(matches);
  }

  async postMatch(req: Request, res: Response) {
    const match = await this.service.postMatch(req.body);

    return res.status(201).json(match);
  }

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;

    await this.service.finishMatch(Number(id));

    return res.status(200).json({ message: 'Finished' });
  }

  async updateMatch(req: Request, res: Response) {
    const { id } = req.params;

    await this.service.updateMatch(Number(id), req.body);

    return res.status(200).json({ message: 'Match updated' });
  }
}
