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

describe('POST - /login', () => {
  describe('When all fields are correct:',() => {
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

    it('It should return the status "OK", and the body containing a token', async () => {
      const response = await chai.request(app).post('/login').send({
        email: 'email@email.com',
        password: 'correctPassword',
      });
    
      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.key('token');
    });
  });

  describe('When there are incorrect fields:', () => {
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

    it('It should return the status "Bad Request", and body containing the correct message if one of them is missing', async () => {
      const response = await chai.request(app).post('/login').send({
        email: 'email@email.com',
      });
    
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.eql({ message: 'All fields must be filled' });
    });

    it('It should return the status "Bad Request", and body containing the correct message if one of them is empty', async () => {
      const response = await chai.request(app).post('/login').send({
        email: '',
        password: '',
      });
    
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.eql({ message: 'All fields must be filled' });
    });

    it('It should return the status "Unauthorized", and body containing the correct message if the email has an incorrect format', async () => {
      const response = await chai.request(app).post('/login').send({
        email: 'incorrect email format',
        password: 'hash',
      });
    
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.eql(  { message: 'Incorrect email or password' });
    });

    it('It should return the status "Unauthorized", and body containing the correct message if the password is incorrect', async () => {
      const response = await chai.request(app).post('/login').send({
        email: 'email@email.com',
        password: 'Incorrect password',
      });
    
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.eql(  { message: 'Incorrect email or password' });
    });
  })
});
