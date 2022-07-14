import * as jwt from 'jsonwebtoken';
import * as bcryptjs from 'bcryptjs';
import { NextFunction, Request, Response, ErrorRequestHandler } from 'express';
import loginJoi from '../utils/validationJois';
import UserRepository from '../repository/user.repository';
import TeamRepository from '../repository/team.repository';

const INCORRECT_FIELDS = 'Incorrect email or password';
const TOKEN_NOT_FOUND = 'Token not found';
const INVALID_TOKEN = 'Invalid or expired token';
const SECRET = process.env.JWT_SECRET;

const userRepository = new UserRepository();
const teamRepository = new TeamRepository();

const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err) {
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

export { errorHandler, validateLogin, validateToken, teamExists };
