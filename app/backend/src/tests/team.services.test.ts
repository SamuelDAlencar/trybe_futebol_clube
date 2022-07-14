import * as chai from 'chai';
import * as sinon from 'sinon';
import { it } from 'mocha';
const { expect } = chai;

import TeamModel from '../database/models/teams';
import TeamRepository from '../repository/team.repository';
import TeamService from '../services/team.services';

const repository = new TeamRepository();
const service = new TeamService(repository);

describe('Team Services:', () => {
  describe('getAllTeams - When there are teams to list', () => {
    before(() => {
      sinon.stub(TeamModel, 'findAll')
        .resolves([
          {
            id: 1,
            teamName: "Avaí/Kindermann"
          },
          {
            id: 2,
            teamName: "Bahia"
          },
          {
            id: 3,
            teamName: "Botafogo"
          }
        ] as TeamModel[]);
    });

    after(() => {
      (TeamModel.findAll as sinon.SinonStub).restore();
    });

    it('It should return an array of teams', async () => {
      const teams = await service.getAllTeams();

      expect(teams).to.be.an('array');
      expect(teams[0]).to.be.have.keys(['id', 'teamName']);
    });
  });

  describe('getAllTeams - When there are NO teams to list', () => {
    before(() => {
      sinon.stub(TeamModel, 'findAll')
        .resolves([] as TeamModel[]);
    });

    after(() => {
      (TeamModel.findAll as sinon.SinonStub).restore();
    });

    it('It should return an empty array', async () => {
      const teams = await service.getAllTeams();

      expect(teams).to.be.an('array');
      expect(teams).to.have.length(0);
    });
  });

  describe('getTeamById - When there is a team that corresponds with the "id" received:', () => {
    before(() => {
      sinon.stub(TeamModel, 'findByPk')
        .resolves({
          id: 1,
          teamName: 'Avaí/Kindermann'
        } as TeamModel);
    });

    after(() => {
      (TeamModel.findByPk as sinon.SinonStub).restore();
    });

    it('It should return the respective "team"', async () => {
      const team = await service.getTeamById(1);

      expect(team).to.be.an('object');
      expect(team).to.have.keys(['id', 'teamName']);
    });
  });
});
