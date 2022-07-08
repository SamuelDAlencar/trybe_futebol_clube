import Model from '../database/models/users';
import { IUser, IModel } from '../interfaces';

export default class Repository implements IModel {
  constructor(private model = Model) {
    this.model = model;
  }

  async login(email: string): Promise<IUser> {
    const user = await this.model
      .findOne({
        where: { email },
      });

    return user as IUser;
  }
}
