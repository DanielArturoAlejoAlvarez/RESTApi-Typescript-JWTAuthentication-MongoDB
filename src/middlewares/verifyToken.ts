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
    const token = req.header("auth-token");

    if (!token)
      return res.status(401).json({
        msg: "Access denied!",
      });

    const payload = jwt.verify(token, config.secret_key) as IPayload;

    req.userId = payload.id;

    console.log(payload);
    console.log(req.userId);

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
