import * as express from 'express';
import TeamController from '../../controllers/team.controller';
import TeamServices from '../../services/team.services';
import TeamRepository from '../../repository/team.repository';

const entityFactory = () => {
  const repository = new TeamRepository();
  const service = new TeamServices(repository);
  const controller = new TeamController(service);

  return controller;
};

const router = express.Router();

router.get('/', (req, res) => entityFactory().getTeams(req, res));

export default router;
