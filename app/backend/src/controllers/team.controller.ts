import { Request, Response } from 'express';
import { ITeamService } from '../interfaces';

export default class TeamController {
  constructor(private service: ITeamService) {
    this.service = service;
  }

  async getTeams(req: Request, res: Response) {
    const teams = await this.service.getTeams();

    return res.status(200).json(teams);
  }

  async getTeamById(req: Request, res: Response) {
    const { id } = req.params;

    const team = await this.service.getTeamById(Number(id));

    return res.status(200).json(team);
  }
}
