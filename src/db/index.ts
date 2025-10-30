import { Pool } from 'pg';

const database =
  process.env.NODE_ENV === 'development'
    ? process.env.POSTGRES_DB
    : process.env.POSTGRES_DB_TEST;

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT as string, 10),
});

pool.on('error', (err: Error) => {
  console.error('Unexpected error on database connection', err);
});

export default pool;
