// @ts-ignore
import chaiHttp = require('chai-http');
import { it } from 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
const { expect } = chai;

import { app } from '../app';
import UserModel from '../database/models/users';

chai.use(chaiHttp);


describe('When calling the /login route with the POST method', () => {
  describe('If all fields are correct:',() => {
    before(() => {
      sinon.stub(UserModel, 'findOne')
        .resolves({
          email: 'email@email.com',
          password: 'hash',
        } as UserModel);
    });

    after(() => {
      (UserModel.findOne as sinon.SinonStub).restore();
    });

    it('It should return the status 200', async () => {
      const response = await chai.request(app).post('/login').send({
        email: 'email@email.com',
        password: 'password',
      });
    
      expect(response.status).to.be.equal(200);
    });

    it('It should return a correct token', async () => {
      const response = await chai.request(app).post('/login').send({
        email: 'email@email.com',
        password: 'password',
      });
    
      expect(response.body).to.have.key('token');
    });
  });

  describe('When there are missing fields:', () => {
    before(() => {
      sinon.stub(UserModel, 'findOne')
        .resolves({
          email: 'email@email.com',
          password: 'hash',
        } as UserModel);
    });

    after(() => {
      (UserModel.findOne as sinon.SinonStub).restore();
    });

    it('It should return the status 400', async () => {
      const response = await chai.request(app).post('/login').send({
        email: 'email@email.com',
      });
    
      expect(response.status).to.be.equal(400);
    });
  })
});
