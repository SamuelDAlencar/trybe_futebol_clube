import * as jwt from 'jsonwebtoken';

import { IModel, IRole, IService } from '../interfaces';
import { TUser } from '../entities';
import generateJwt from '../utils/generateJwt';

const secret = process.env.JWT_SECRET;

export default class UserService implements IService {
  constructor(private model: IModel) {
    this.model = model;
  }

  async login(data: TUser): Promise<string | boolean> {
    const { email, password } = data;

    await this.model.findOneByEmail(email);

    const token = generateJwt({ email, password });

    return token;
  }

  async validateRole(token: string): Promise<IRole> {
    const decoding = jwt.verify(token as string, secret as string) as jwt.JwtPayload;

    const { role } = await this.model.findOneByEmail(decoding.data.email) as IRole;

    return { role };
  }
}
