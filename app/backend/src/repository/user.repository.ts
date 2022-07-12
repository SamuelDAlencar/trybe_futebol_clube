import Model from '../database/models/users';
import { IUserModel } from '../interfaces';
import { TUser } from '../types';

export default class Repository implements IUserModel {
  constructor(private model = Model) {
    this.model = model;
  }

  async findOneByEmail(email: string): Promise<TUser> {
    const user = await this.model
      .findOne({
        where: { email },
      });

    return user as TUser;
  }
}
