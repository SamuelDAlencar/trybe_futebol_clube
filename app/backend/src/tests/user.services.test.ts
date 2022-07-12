import * as jwt from 'jsonwebtoken';
import * as chai from 'chai';
import * as sinon from 'sinon';
import { it } from 'mocha';
const { expect } = chai;

import UserModel from '../database/models/users';
import UserRepository from '../repository/user.repository';
import UserService from '../services/user.services';

const repository = new UserRepository();
const service = new UserService(repository);


describe('User services:', () => {
  describe('userServices - "login" method', () => {
    before(() => {
      sinon.stub(UserModel, 'findOne')
        .resolves({
          email: 'email@email.com',
          password: 'correctPassword',
        } as UserModel);

      sinon.stub(jwt, 'sign')
        .returns('token.token.token' as any);
    });

    after(() => {
      (UserModel.findOne as sinon.SinonStub).restore();
      (jwt.sign as sinon.SinonStub).restore();
    });

    it('Should return an object containing a "token"', async () => {
      const response = await service.login({
        email: 'email@email.com',
        password: 'correctPassword',
      });

      expect(response).to.have.key('token');
    });
  });

  describe('userServices - "validateRole" method', () => {
    before(() => {
      sinon.stub(UserModel, 'findOne')
        .resolves({
          email: 'email@email.com',
          password: 'correctPassword',
          role: 'admin'
        } as UserModel);

      sinon.stub(jwt, 'verify')
      .returns({ data: { email: 'email@email.com' }
        } as any);
    });

    after(() => {
      (UserModel.findOne as sinon.SinonStub).restore();
      (jwt.verify as sinon.SinonStub).restore();
    });

    it('Should return an object containing a "role"', async () => {
      const response = await service.validateRole('token. token.token');
      
      expect(response).to.have.key('role');
      expect(response.role).to.be.oneOf(['user', 'admin']);
    });
  });
});
