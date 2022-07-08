import { NextFunction, Request, Response } from 'express';

export default (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  return !(email || password)
    ? res.status(200).json({ message: 'fields missing' })
    : next();
};
