import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DATABASE_URL as string, // Read from .env file
  {
    dialect: "postgres",
    logging: console.log
  }
);