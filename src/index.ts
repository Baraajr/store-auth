import dotenv from 'dotenv';
// env variables
dotenv.config();
import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import errorMiddleware from './middlewares/error.middlewre';
import db from './db/index';
import routes from './routes/index';

const app: Application = express();
process.on('uncaughtException', (err) => {
  console.log('uncaught exception, shutting down ....');
  console.log(err.message);
}); // this handler should be in the top to catch exceptions;

// connect db
db.connect()
  .then((client) => {
    return client
      .query('SELECT NOW()')
      .then((res) => {
        console.log(`database connected on ` + res.rows[0].now);
      })
      .catch((err) => {
        console.error('Query error:', err);
      })
      .finally(() => {
        client.release();
      });
  })
  .catch((err) => {
    console.error('Connection error:', err);
  });

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
  standardHeaders: 'draft-8', // return rate limit info`RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});
app.use(limiter);

// routes
app.use('/api/v1', routes);

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

process.on('unhandledRejection', (err) => {
  console.log('unhandled rejection, shutting down ....');
  console.log(err);

  //process.exit(1); // to end the application
  // this will immediately abort  all requests that re currently running or pending
  // 0 means success
  // 1 means uncaught exception
  // wee need to end the app gracefully
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
