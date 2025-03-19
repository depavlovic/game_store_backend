import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './User';
import { Game } from './Game';
import { UserGame } from './UserGame';



dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',  
  host: process.env.DB_HOST, 
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME, 
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME, 
  entities: [User, Game, UserGame], 
  synchronize: true, 
  logging: true, 
});



