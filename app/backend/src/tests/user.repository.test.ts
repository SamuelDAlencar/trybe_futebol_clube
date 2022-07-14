import * as chai from 'chai';
import * as sinon from 'sinon';
import { it } from 'mocha';
const { expect } = chai;

import UserModel from '../database/models/users';
import UserRepository from '../repository/user.repository';

const userRepository = new UserRepository(UserModel);

describe('User repository:', () => {
  describe('findOneByEmail - When it receives an email:', () => {
    before(() => {
      sinon.stub(UserModel, 'findOne').
        resolves({
          id: 1,
          username: 'username',
          role: 'role',
          email: 'email@email.com',
          password: 'password'
        } as UserModel);
    });

    after(() => {
      (UserModel.findOne as sinon.SinonStub).restore();
    });

    it('It should return the respective user\'s infos', async () => {
      const response = await userRepository.findByEmail('email@email.com');
    
      expect(response).to.be.an('object');
      expect(response).to.have.keys(['id', 'username', 'role', 'email', 'password']);
    });
  });
});

