import mysql from 'promise-mysql';
import Config from './config';

const {
  Database: { host, port, user, password, name },
} = Config;

export const getDB = async () => {
  const pool = await mysql.createPool({
    host,
    port,
    user,
    password,
    database: name,
  });
  return pool;
};

export default getDB;
