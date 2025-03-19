import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { AppDataSource } from './models/entities/db'; 
import { Game } from './models/entities/Game';
import authRoutes from './routes/auth';
import bodyParser from "body-parser";



dotenv.config(); 

const app = express();
const PORT = process.env.SERVER_PORT || 5000; 

app.use(cors());  
app.use(express.json());  
app.use(bodyParser.json());
app.use("/auth", authRoutes);




AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully');
    
   
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error: unknown) => {
    console.error('Error during Data Source initialization', error);
  });
  app.get('/api/local-games', async (req, res) => { //iz baze
    const gameRepository = AppDataSource.getRepository(Game);
    const games = await gameRepository.find();
    res.json(games);
  });
  
  const addGame = async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, shortDescription, thumbnail, price } = req.body;
  
  
      if (!title || !price) {
        res.status(400).json({ error: 'Title and price are required' });
        return;
      }
  
     
      const gameRepository = AppDataSource.getRepository(Game);
      const newGame = gameRepository.create({
        title,
        shortDescription,
        thumbnail,
        price,
      });
  
     
      await gameRepository.save(newGame);
  
    
      res.status(201).json({ message: 'Game added successfully', game: newGame });
    } catch (error) {
     
      console.error('Error adding game:', error);
      res.status(500).json({
        timestamp: new Date().toISOString(),
      });
    }
  };
  

  app.post('/api/games', addGame);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/games', async (req, res) => {
  try {
    const response = await axios.get('https://www.freetogame.com/api/games');
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get('/api/game', async (req, res) => { // ruta za getovanje po Id
  const gameId = req.query.id;

  try {
    const response = await axios.get(`https://www.freetogame.com/api/game?id=${gameId}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching game details:", error);
    res.status(500).json({ error: "Server error while fetching game details" });
  }
});




