import config from "../config/config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface IPayload {
    id: string;
    iat: number;
    exp: number;
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    
  } catch (err) {
    
  }
};
