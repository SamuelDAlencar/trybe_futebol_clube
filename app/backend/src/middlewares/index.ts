import { NextFunction, Request, Response } from 'express';

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  return !email || !password
    ? res.status(400).json({ message: 'All fields must be filled' })
    : next();
};

export { validateLogin };
