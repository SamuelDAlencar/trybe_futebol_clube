import { compareSync } from 'bcryptjs';
import { IModel, IService } from '../interfaces';
import { TUser } from '../entities';
import generateJwt from '../utils/generateJwt';

export default class UserService implements IService {
  constructor(private model: IModel) {
    this.model = model;
  }

  async login(data: TUser): Promise<string | boolean> {
    const { email, password: reqPass } = data;

    const { password: userPass } = await this.model.login(email);

    const valid = compareSync(reqPass, userPass);

    if (valid) {
      const token = generateJwt({ email, password: reqPass });

      return token;
    }

    return false;
  }
}
