// @ts-ignore
import chaiHttp = require('chai-http');
import { it } from 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
const { expect } = chai;

import { app } from '../app';
import UserModel from '../database/models/users';
import * as bcryptjs from 'bcryptjs';

chai.use(chaiHttp);

describe('When calling the /login route with the POST method', () => {
  describe('If all fields are correct:',() => {
    before(() => {
      sinon.stub(UserModel, 'findOne')
        .resolves({
          email: 'email@email.com',
          password: 'correctPassword',
        } as UserModel);

      sinon.stub(bcryptjs, 'compare')
        .resolves(true);
    });

    after(() => {
      (UserModel.findOne as sinon.SinonStub).restore();
      (bcryptjs.compare as sinon.SinonStub).restore();
    });

    it('It should return the status 200', async () => {
      const response = await chai.request(app).post('/login').send({
        email: 'email@email.com',
        password: 'correctPassword',
      });
    
      expect(response.status).to.be.equal(200);
    });

    it('It should return a correct token', async () => {
      const response = await chai.request(app).post('/login').send({
        email: 'email@email.com',
        password: 'correctPassword',
      });
    
      expect(response.body).to.have.key('token');
    });
  });

  describe('If there are incorrect fields:', () => {
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

    it('It should return the status 400 when one of them is missing', async () => {
      const response = await chai.request(app).post('/login').send({
        email: 'email@email.com',
      });
    
      expect(response.status).to.be.equal(400);
    });

    it('It should return the correct message when one of them is missing', async () => {
      const response = await chai.request(app).post('/login').send({
        email: 'email@email.com',
      });
    
      expect(response.body).to.be.eql({ message: 'All fields must be filled' });
    });

    it('It should return the status 401 when the email has an incorrect format', async () => {
      const response = await chai.request(app).post('/login').send({
        email: 'incorrect email format',
        password: 'hash',
      });
    
      expect(response.status).to.be.equal(401);
    });

    it('It should return the correct message when the email has an incorrect format', async () => {
      const response = await chai.request(app).post('/login').send({
        email: 'incorrect email format',
        password: 'hash',
      });
    
      expect(response.body).to.be.eql(  { message: 'Incorrect email or password' });
    });

    it('It should return the status 401 when the password is incorrect', async () => {
      const response = await chai.request(app).post('/login').send({
        email: 'email@email.com',
        password: 'Incorrect password',
      });
    
      expect(response.status).to.be.equal(401);
    });

    it('It should return the correct message when the password is incorrect', async () => {
      const response = await chai.request(app).post('/login').send({
        email: 'email@email.com',
        password: 'Incorrect password',
      });
    
      expect(response.body).to.be.eql(  { message: 'Incorrect email or password' });
    });
  })
});
