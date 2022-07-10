import { IModel, IService } from '../interfaces';
import { TUser } from '../entities';
import generateJwt from '../utils/generateJwt';

export default class UserService implements IService {
  constructor(private model: IModel) {
    this.model = model;
  }

  async login(data: TUser): Promise<string | boolean> {
    const { email, password } = data;

    await this.model.login(email);

    const token = generateJwt({ email, password });

    return token;
  }
}
