import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import errorMiddleware from './middlewares/error.middlewre';

const app: Application = express();

// logger
app.use(morgan('dev'));

// http security middleware
app.use(helmet());

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // form submission middleware

// rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'true', // return rate limit info`RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});
app.use(limiter);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Hello, World!',
  });
});

// error handling middleware
app.use(errorMiddleware);

// unhandeled routes
app.all('/', (req: Request, res: Response) => {
  res.status(404).json({ message: ' this route is not implemented' });
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
