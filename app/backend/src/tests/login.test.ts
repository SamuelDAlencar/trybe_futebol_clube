// @ts-ignore
import chaiHttp = require('chai-http');
import * as sinon from 'sinon';
import * as chai from 'chai';

import { app } from '../app';
import UserModel from '../database/models/users';

chai.use(chaiHttp);

const { expect } = chai;

describe('/login', () => {
  describe('POST method',() => {
    before(() => {
      sinon.stub(UserModel, 'create')
        .resolves({
          email: 'email@email.com',
          password: 'password',
        } as UserModel);
    });

    after(() => {
      (UserModel.create as sinon.SinonStub).restore();
    });

    it('It should return the status 200', async () => {
      const response = await chai.request(app).post('/login').send({
        email: 'email@email.com',
        password: 'password',
      });
    
      expect(response.status).to.be.equal(200);
    });
  });
});
