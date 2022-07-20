import * as express from 'express';
import LeaderboardController from '../../controllers/leaderboard.controller';
import LeaderboardServices from '../../services/leaderboard.services';
import LeaderboardRepository from '../../repository/leaderboard.repository';

const entityFactory = () => {
  const repository = new LeaderboardRepository();
  const service = new LeaderboardServices(repository);
  const controller = new LeaderboardController(service);

  return controller;
};

const router = express.Router();

router.get('/home', (req, res) => entityFactory().getHomeLeaderboard(req, res));

router.get('/away', (req, res) => entityFactory().getAwayLeaderboard(req, res));

export default router;
