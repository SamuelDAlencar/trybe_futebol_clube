import { Request, Response } from 'express';
import { IService } from '../interfaces';

export default class UserController {
  constructor(private service: IService) {
    this.service = service;
  }

  async login(req: Request, res: Response) {
    const token = await this.service.login(req.body);

    return res.status(200).json({ token });
  }
}
