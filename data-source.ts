import { DataSource } from 'typeorm';
import { Game } from './models/entities/Game'; 
import { UserGame } from './models/entities/UserGame'; 
import { User } from './models/entities/User';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1111', 
  database: 'game_store',
  entities: [Game, UserGame, User],  
  synchronize: true, 
  logging: true,
});

