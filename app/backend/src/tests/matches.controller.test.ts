import { it } from 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
const { expect } = chai;

import MatchModel from '../database/models/matches';
import MatchRepository from '../repository/match.repository';
import MatchService from '../services/match.services';
import MatchController from '../controllers/match.controller';
import { Request, Response } from 'express';
import { TMatch } from '../types';

const matchRepository = new MatchRepository(MatchModel);
const matchService = new MatchService(matchRepository);
const matchController = new MatchController(matchService);

describe('Match Controller:', () => {
  describe('postMatch - When all fields received are correct:', () => {
    const req = {
      body: {
        homeTeam: 16,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2
      }
    } as any;
    const res = {} as any;

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({});

      sinon.stub(matchService, 'postMatch')
        .resolves({
          id: 1,
          homeTeam: 16,
          homeTeamGoals: 2,
          awayTeam: 8,
          awayTeamGoals: 2,
          inProgress: true,
        } as TMatch);
    });

    after(() => {
      (matchService.postMatch as sinon.SinonStub).restore();
    });

    it('It should return the status "Created", and the body containing the "match" data', async () => {
      await matchController.postMatch(req, res);

      expect(res.status.args[0][0]).to.be.equal(201);
      expect(res.json.args[0][0]).to.have.keys(['id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress']);
    });
  });
});
