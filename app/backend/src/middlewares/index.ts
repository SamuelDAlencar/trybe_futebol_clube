import * as jwt from 'jsonwebtoken';
import * as bcryptjs from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import loginJoi from '../utils/validationJois';
import Model from '../repository/user.repository';

const INCORRECT_FIELDS = 'Incorrect email or password';
const TOKEN_NOT_FOUND = 'Token not found';
const INVALID_TOKEN = 'Invalid or expired token';
const SECRET = process.env.JWT_SECRET;

const UserModel = new Model();

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginJoi.validate(req.body);

  if (error) {
    return res.status(error.message.includes('filled') ? 400 : 401)
      .json({ message: error.message });
  }

  const { email, password: reqPass } = req.body;

  const user = await UserModel.findOneByEmail(email);

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

    const user = await UserModel.findOneByEmail(decoding.data.email);

    if (!user) {
      return res.status(401).json({ message: INVALID_TOKEN });
    }
  } catch (err) {
    console.log(err);

    return res.status(401).json({ message: INVALID_TOKEN });
  }

  next();
};

export { validateLogin, validateToken };
