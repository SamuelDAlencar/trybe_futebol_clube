// @ts-ignore
import { it } from 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
const { expect } = chai;

import TeamModel from '../database/models/teams';
import TeamRepository from '../repository/team.repository';
import TeamService from '../services/team.services';
import TeamController from '../controllers/team.controller';
import { Request, Response } from 'express';
import Team from '../database/models/teams';

const teamRepository = new TeamRepository();
const teamService = new TeamService(teamRepository);
const teamController = new TeamController(teamService);

describe('Team Controller', () => {
  describe('getAllTeams - When there are teams on the list:', () => {
    const req = {} as any;
    const res = {} as any;

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({});

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
      ] as Team[]);
    });

    after(() => {
      (TeamModel.findAll as sinon.SinonStub).restore();
    });

    it('It should return the status "OK"', async () => {
      await teamController.getAllTeams(req, res);

      expect(res.status.args[0][0]).to.be.equal(200);
    });

    it('It should return an array of "teams"', async () => {
      await teamController.getAllTeams(req, res);

      expect(res.json.args[0][0]).to.be.an('array');
      expect(res.json.args[0][0][0]).to.have.keys(['id', 'teamName']);
    });
  });  

  describe('getAllTeams - When there are NO teams on the list:', () => {
    const req = {} as any;
    const res = {} as any;

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({});

      sinon.stub(TeamModel, 'findAll')
      .resolves([] as Team[]);
    });

    after(() => {
      (TeamModel.findAll as sinon.SinonStub).restore();
    });

    it('It should return the status "OK"', async () => {
      await teamController.getAllTeams(req, res);

      expect(res.status.args[0][0]).to.be.equal(200);
    });

    it('It should return an empty array', async () => {
      await teamController.getAllTeams(req, res);

      expect(res.json.args[0][0]).to.be.an('array');
      expect(res.json.args[0][0]).to.have.length(0);
    });
  });

  describe('getTeamById - When there is a team that corresponds with the "id" received:', () => {
    const req = { params: { id: 1 } } as any;
    const res = {} as any;

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({});

      sinon.stub(TeamModel, 'findByPk')
      .resolves({
          id: 1,
          teamName: 'Avaí/Kindermann'
      } as Team);
    });

    after(() => {
      (TeamModel.findByPk as sinon.SinonStub).restore();
    });

    it('It should return the status "OK"', async () => {
      await teamController.getTeamById(req, res);

      expect(res.status.args[0][0]).to.be.equal(200);
    });

    it('It should return the respective "team"', async () => {
      await teamController.getTeamById(req, res);

      expect(res.json.args[0][0]).to.be.an('object');
      expect(res.json.args[0][0]).to.have.keys(['id', 'teamName']);
      expect(res.json.args[0][0]).to.be.eql({
        id: 1,
        teamName: 'Avaí/Kindermann'
      });
    });
  });  

});
