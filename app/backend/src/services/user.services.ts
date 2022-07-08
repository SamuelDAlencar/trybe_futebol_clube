import { IModel, IService, TToken, ILogin } from '../interfaces';
import generateJwt from '../utils/generateJwt';

export default class UserService implements IService {
  constructor(private model: IModel) {
    this.model = model;
  }

  async login(data: ILogin): Promise<TToken> {
    const user = await this.model.login(data);

    const { email, password } = user;

    const token: TToken = generateJwt({ email, password });

    return token;
  }
}
