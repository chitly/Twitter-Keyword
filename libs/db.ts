import mysql from '../modules/mysql.ts';
import env from '../modules/dotenv.ts';

const db = await mysql.connect({
  db: env.DB_NAME,
  hostname: env.DB_HOST,
  username: env.DB_USER,
  password: env.DB_PASS,
  port: parseInt(env.DB_PORT, 10),
  charset: 'utf8mb4',
});

export default db;
