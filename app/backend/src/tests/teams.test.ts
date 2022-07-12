// @ts-ignore
import chaiHttp = require('chai-http');
import { it } from 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
const { expect } = chai;

import { app } from '../app';
import TeamModel from '../database/models/teams';

chai.use(chaiHttp);

describe('GET - /teams', () => {
  describe('When there are teams to list', () => {
    before(() => {
      sinon.stub(TeamModel, 'findAll')
        .resolves([
          {
            id: 1,
            teamName: 'Avaí/Kindermann'
          },
          {
            id: 2,
            teamName: 'Bahia'
          },
          {
            id: 3,
            teamName: 'Botafogo'
          }
        ] as TeamModel[]);
    });

    after(() => {
      (TeamModel.findAll as sinon.SinonStub).restore();
    });
    
    it('It should return the status "OK", and the body containing an array of teams', async () => {
      const response = await chai.request(app).get('/teams');

      expect(response.status).to.be.equal(200);
    });

    it('It should return an array of teams', async () => {
      const response = await chai.request(app).get('/teams');

      expect(response.body).to.be.an('array');
      expect(response.body[0]).to.be.an('object');
    });
  });
});
