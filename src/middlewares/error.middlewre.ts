import { Request, Response } from 'express';
import Error from '../interfaces/error.interface';
const errorMiddleware = (err: Error, req: Request, res: Response) => {
  const status = err.status || 500;
  const message = err.message || 'something went wrong';
  res.status(status).json({ message });
};

export default errorMiddleware;
