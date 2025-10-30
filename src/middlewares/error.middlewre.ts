import { Request, Response, NextFunction } from 'express';
import Error from '../interfaces/error.interface';

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';

  res.status(status).json({ message });
};

export default errorMiddleware;
