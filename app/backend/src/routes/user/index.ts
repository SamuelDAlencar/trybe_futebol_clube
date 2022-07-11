import * as express from 'express';
import UserController from '../../controllers/user.controller';
import UserServices from '../../services/user.services';
import UserRepository from '../../repository/user.repository';
import { validateLogin, validateToken } from '../../middlewares';

const entityFactory = () => {
  const repository = new UserRepository();
  const service = new UserServices(repository);
  const controller = new UserController(service);

  return controller;
};

const router = express.Router();

router.post(
  '/',
  validateLogin,
  (req, res) => entityFactory().login(req, res),
);

router.get(
  '/validate',
  validateToken,
  (req, res) => entityFactory().validateRole(req, res),
);

export default router;
