import * as express from 'express';
import MatchController from '../../controllers/match.controller';
import MatchServices from '../../services/match.services';
import MatchRepository from '../../repository/match.repository';

const entityFactory = () => {
  const repository = new MatchRepository();
  const service = new MatchServices(repository);
  const controller = new MatchController(service);

  return controller;
};

const router = express.Router();

router.get('/', (req, res) => entityFactory().getAllMatches(req, res));

export default router;
