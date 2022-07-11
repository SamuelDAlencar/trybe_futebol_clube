import Model from '../database/models/users';
import { IModel } from '../interfaces';
import { TUser } from '../entities';

export default class Repository implements IModel {
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
