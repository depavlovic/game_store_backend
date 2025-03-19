import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/entities/User";  
import { AppDataSource } from "../models/entities/db"; 

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name } = req.body; 

  try {
    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOneBy({ email });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const newUser = userRepository.create({ email, password, name }); 
    await userRepository.save(newUser);
    
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: "Error registering user" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
  
    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({ email });
  
      if (!user || user.password !== password) {
        res.status(400).json({ message: "Invalid credentials" });
        return;
      }
  
      
      const token = jwt.sign({ id: user.userId }, "your_jwt_secret", { expiresIn: "1h" });
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: "Error logging in" });
    }
  };