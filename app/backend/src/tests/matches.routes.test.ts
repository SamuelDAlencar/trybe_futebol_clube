// @ts-ignore
import chaiHttp = require('chai-http');
import { it } from 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
const { expect } = chai;

import { app } from '../app';
import MatchModel from '../database/models/matches';

chai.use(chaiHttp);

describe('Match routes:', () => {
  describe('GET => /matches - When there are matches on the list:', () => {
    before(() => {
      sinon.stub(MatchModel, 'findAll')
      .resolves([
        {
          id: 1,
          homeTeam: 16,
          homeTeamGoals: 1,
          awayTeam: 8,
          awayTeamGoals: 1,
          inProgress: false,
          teamHome: {
            teamName: 'São Paulo'
          },
          teamAway: {
            teamName: 'Grêmio'
          }
        },
        {
          id: 2,
          homeTeam: 16,
          homeTeamGoals: 2,
          awayTeam: 9,
          awayTeamGoals: 0,
          inProgress: true,
          teamHome: {
            teamName: 'São Paulo'
          },
          teamAway: {
            teamName: 'Internacional'
          }
        }
      ] as any);
    });

    after(() => {
      (MatchModel.findAll as sinon.SinonStub).restore();
    });

    it('It should return the status "OK"', async () => {
      const response = await chai.request(app).get('/matches');

      expect(response.status).to.be.equal(200);
    });

    it('It should return an array of matches', async () => {
      const response = await chai.request(app).get('/matches');

      expect(response.body).to.be.an('array');
      expect(response.body[0]).to.be.an('object');
      expect(response.body[0]).to.have.keys(
        ['id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress', 'teamHome', 'teamAway']
      );
    });
  });

  describe('GET => /matches - When there are NO matches on the list:', () => {
    before(() => {
      sinon.stub(MatchModel, 'findAll')
      .resolves([] as any);
    });

    after(() => {
      (MatchModel.findAll as sinon.SinonStub).restore();
    });

    it('It should return the status "OK"', async () => {
      const response = await chai.request(app).get('/matches');

      expect(response.status).to.be.equal(200);
    });

    it('It should return an empty array', async () => {
      const response = await chai.request(app).get('/matches');

      expect(response.body).to.be.an('array');
      expect(response.body).to.have.length(0);
    });
  });

//   describe('POST => /matches - When all body fields are correct', () => {
//     before(() => {

//     });

//     after(() => {
      
//     });

//     it('It should return the "Created" status', async () => {
//       const response = await chai.request(app)
//         .post('/matches')
//         .send({
//           homeTeam: 16,
//           awayTeam: 8,
//           homeTeamGoals: 2,
//           awayTeamGoals: 2
//         });

//       expect(response.status).to.be.equal(201);
//       expect(response.status).to.be.eql({
//         id: 1,
//         homeTeam: 16,
//         homeTeamGoals: 2,
//         awayTeam: 8,
//         awayTeamGoals: 2,
//         inProgress: true,
//       });
//     });

//     it('It should return the match\'s data inside the body', async () => {
//       const response = await chai.request(app)
//         .post('/matches')
//         .send({
//           homeTeam: 16,
//           awayTeam: 8,
//           homeTeamGoals: 2,
//           awayTeamGoals: 2
//         });

//       expect(response.status).to.be.eql({
//         id: 1,
//         homeTeam: 16,
//         homeTeamGoals: 2,
//         awayTeam: 8,
//         awayTeamGoals: 2,
//         inProgress: true,
//       });
//     });
//   });
});
