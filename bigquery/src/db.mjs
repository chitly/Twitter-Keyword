import mysql from 'promise-mysql';
import Config from './config';

const {
  Database: { host, port, user, password, name },
} = Config;

export const getDB = async () => {
  try {
    const pool = await mysql.createPool({
      host,
      port,
      user,
      password,
      database: name,
    });
    return pool;
  } catch (err) {
    console.error('getDB', err);
    throw err;
  }
};
