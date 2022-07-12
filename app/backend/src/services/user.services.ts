import * as jwt from 'jsonwebtoken';

import { IUserModel, IUserService } from '../interfaces';
import { TUser, TRole, TToken } from '../types';
import generateJwt from '../utils/generateJwt';

const secret = process.env.JWT_SECRET;

export default class UserService implements IUserService {
  constructor(private model: IUserModel) {
    this.model = model;
  }

  async login(data: TUser): Promise<TToken> {
    const { email, password } = data;

    await this.model.findOneByEmail(email);

    const token = generateJwt({ email, password });

    return { token };
  }

  async validateRole(token: string): Promise<TRole> {
    const decoding = jwt.verify(token, secret as string) as jwt.JwtPayload;

    const { role } = await this.model.findOneByEmail(decoding.data.email) as TRole;

    return { role };
  }
}
