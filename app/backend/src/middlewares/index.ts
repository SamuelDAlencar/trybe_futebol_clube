import * as jwt from 'jsonwebtoken';
import * as bcryptjs from 'bcryptjs';
import { NextFunction, Request, Response, ErrorRequestHandler } from 'express';
import { loginJoi, matchJoi } from '../utils/validationJois';
import UserRepository from '../repository/user.repository';
import TeamRepository from '../repository/team.repository';

const INCORRECT_FIELDS = 'Incorrect email or password';
const TOKEN_NOT_FOUND = 'Token not found';
const INVALID_TOKEN = 'Token must be a valid token';
const SECRET = process.env.JWT_SECRET;

const userRepository = new UserRepository();
const teamRepository = new TeamRepository();

const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!err.status) {
    console.log(err);

    return res.status(500).json({ message: 'Server side error' });
  }

  next();
};

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginJoi.validate(req.body);

  if (error) {
    return res.status(error.message.includes('filled') ? 400 : 401)
      .json({ message: error.message });
  }

  const { email, password: reqPass } = req.body;

  const user = await userRepository.findByEmail(email);

  if (!user) {
    return res.status(401).json({ message: INCORRECT_FIELDS });
  }

  const valid = await bcryptjs.compare(reqPass, user.password);

  if (!valid) {
    return res.status(401).json({ message: INCORRECT_FIELDS });
  }

  next();
};

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization as string;

  if (!token) {
    return res.status(401).json({ message: TOKEN_NOT_FOUND });
  }

  try {
    const decoding = jwt.verify(token as string, SECRET as string) as jwt.JwtPayload;

    const user = await userRepository.findByEmail(decoding.data.email);

    if (!user) {
      return res.status(401).json({ message: INVALID_TOKEN });
    }
  } catch (err) {
    return res.status(401).json({ message: INVALID_TOKEN });
  }

  next();
};

const teamExists = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const user = await teamRepository.findById(Number(id));

  if (!user) {
    return res.status(404).json({ message: 'There is no team that corresponds with that id' });
  }

  next();
};

const validateMatchPost = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam: homeTeamId, awayTeam: awayTeamId } = req.body;

  const { error } = matchJoi.validate(req.body);

  if (error) {
    return res.status(error.message.includes('filled') ? 400 : 401)
      .json({ message: error.message });
  }

  const homeTeam = await teamRepository.findById(homeTeamId);
  const awayTeam = await teamRepository.findById(awayTeamId);

  if (homeTeamId === awayTeamId) {
    return res.status(401)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  if (!homeTeam || !awayTeam) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  next();
};

export { errorHandler, validateLogin, validateToken, teamExists, validateMatchPost };
