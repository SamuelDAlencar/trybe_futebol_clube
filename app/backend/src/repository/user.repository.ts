import Model from '../database/models/users';
import { IUser, IModel, ILogin } from '../interfaces';

export default class Repository implements IModel {
  constructor(private model = Model) {
    this.model = model;
  }

  async login(data: ILogin): Promise<IUser> {
    const { email, password } = data;

    const user = await this.model
      .findOne({
        where: { email, password },
      });

    return user as IUser;
  }
}
