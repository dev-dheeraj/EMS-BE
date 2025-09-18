import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // load .env

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,       // database name
  process.env.DB_USER,       // username
  process.env.DB_PASSWORD,   // password
  {
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: console.log, // set false to disable SQL logs
  }
);

export default sequelize;
