import dotenv from 'dotenv';

dotenv.config();

const config = {
  CredentialsFile: process.env.CREDENTIALS_PATH,
  ProjectId: process.env.PROJECT_ID,
  Database: {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
  },
};
export default config;
