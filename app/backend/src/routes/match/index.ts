import * as express from 'express';
import MatchController from '../../controllers/match.controller';
import MatchServices from '../../services/match.services';
import MatchRepository from '../../repository/match.repository';
import { matchExists, validateMatchPost, validateToken } from '../../middlewares';

const entityFactory = () => {
  const repository = new MatchRepository();
  const service = new MatchServices(repository);
  const controller = new MatchController(service);

  return controller;
};

const router = express.Router();

router.get('/', (req, res) => entityFactory().getAllMatches(req, res));

router.post(
  '/',
  validateToken,
  validateMatchPost,
  (req, res) => entityFactory().postMatch(req, res),
);

router.patch('/:id', matchExists, (req, res) => entityFactory().updateMatch(req, res));

router.patch('/:id/finish', matchExists, (req, res) => entityFactory().finishMatch(req, res));

export default router;
