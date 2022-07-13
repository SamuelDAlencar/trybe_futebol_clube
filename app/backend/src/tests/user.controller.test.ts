// @ts-ignore
import { it } from 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
const { expect } = chai;

import UserModel from '../database/models/users';
import UserRepository from '../repository/user.repository';
import UserService from '../services/user.services';
import UserController from '../controllers/user.controller';
import { Request, Response } from 'express';

const userRepository = new UserRepository(UserModel);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

describe('User Controller:', () => {
  describe('login - When all fields received are correct:',() => {
    const req = {
      body: {
        email: 'email@email.com',
        password: 'password'
      }
    } as any;
    const res = {} as any;

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({});

      sinon.stub(UserModel, 'findOne')
        .resolves({
          id: 1,
          username: 'username',
          role: 'user',
          email: 'email@email.com',
          password: 'password'
        } as UserModel);
      
        sinon.stub(userService, 'login')
        .resolves({token: 'token'});
    });

    after(() => {
      (UserModel.findOne as sinon.SinonStub).restore();
      (userService.login as sinon.SinonStub).restore();
    });

    it('It should return the status "OK", and the body containing a "token"', async () => {
      await userController.login(req, res);
    
      expect(res.status.args[0][0]).to.be.equal(200);
      expect(res.json.args[0][0]).to.have.key('token');
    });
  });

  describe('validateRole - When the request header has an authorization "token":',() => {
    const req = { headers: { authorization: 'token' } } as any;
    const res = {} as any;

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({});
      
      sinon.stub(UserModel, 'findOne')
      .resolves({
        id: 1,
        username: 'username',
        role: 'user',
        email: 'email@email.com',
        password: 'password'
      } as UserModel);

      sinon.stub(userService, 'validateRole')
        .resolves({ role: 'user' });
    });
    
    after(() => {
      (UserModel.findOne as sinon.SinonStub).restore();
      (userService.validateRole as sinon.SinonStub).restore();
    });

    it('It should return the status "OK", and the body containing the user\'s "role"', async () => {
      await userController.validateRole(req, res);
    
      expect(res.status.args[0][0]).to.be.equal(200);
      expect(res.json.args[0][0]).to.have.key('role');
      expect(res.json.args[0][0].role).to.be.oneOf(['user', 'admin']);
    });
  });
});