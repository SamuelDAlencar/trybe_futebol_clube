// @ts-ignore
import chaiHttp = require('chai-http');
import { it } from 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
const { expect } = chai;

import { app } from '../app';
import TeamModel from '../database/models/teams';

chai.use(chaiHttp);

describe('Team routes:', () => {
  describe('GET => /teams - When there are teams on the list:', () => {
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
    
    it('It should return the status "OK"', async () => {
      const response = await chai.request(app).get('/teams');

      expect(response.status).to.be.equal(200);
    });

    it('It should return an array of teams', async () => {
      const response = await chai.request(app).get('/teams');

      expect(response.body).to.be.an('array');
      expect(response.body[0]).to.be.an('object');
      expect(response.body[0]).to.have.keys(
        ['id', 'teamName']
      );
    });
  });

  describe('GET => /teams - When there are NO teams on the list:', () => {
    before(() => {
      sinon.stub(TeamModel, 'findAll')
        .resolves([] as TeamModel[]);
    });

    after(() => {
      (TeamModel.findAll as sinon.SinonStub).restore();
    });
    
    it('It should return the status "OK"', async () => {
      const response = await chai.request(app).get('/teams');

      expect(response.status).to.be.equal(200);
    });

    it('It should return an empty array', async () => {
      const response = await chai.request(app).get('/teams');

      expect(response.body).to.be.an('array');
      expect(response.body).to.have.length(0);
      expect(response.body[0]).to.be.equal(undefined);
    });
  });

  describe('GET => /teams:id - When there is a team that corresponds with the id received:', () => {
    before(() => {
      sinon.stub(TeamModel, 'findOne')
        .resolves({
          id: 1,
          teamName: 'Avaí/Kindermann'
        } as TeamModel);
    });

    after(() => {
      (TeamModel.findOne as sinon.SinonStub).restore();
    });
    
    it('It should return the status "OK"', async () => {
      const response = await chai.request(app).get('/teams/1');

      expect(response.status).to.be.equal(200);
    });

    it('It should return the respective "team"', async () => {
      const response = await chai.request(app).get('/teams/1');

      expect(response.body).to.be.an('object');
      expect(response.body).to.have.keys(['id', 'teamName']);
      expect(response.body).to.be.eql({
        id: 1,
        teamName: 'Avaí/Kindermann'
      });
    });
  });

  describe('GET => /teams:id - When there is NO team that corresponds with the id received:', () => {
    before(() => {
      sinon.stub(TeamModel, 'findOne')
        .resolves(undefined);
    });

    after(() => {
      (TeamModel.findOne as sinon.SinonStub).restore();
    });
    
    it('It should return the status "Not Found"', async () => {
      const response = await chai.request(app).get('/teams/9999999999');

      expect(response.status).to.be.equal(404);
    });

    it('It should return the correct "message"', async () => {
      const response = await chai.request(app).get('/teams/99999999999');

      expect(response.body).to.be.an('object');
      expect(response.body).to.be.eql({
        message: 'There is no team that corresponds with that id'
      });
    });
  });
});
