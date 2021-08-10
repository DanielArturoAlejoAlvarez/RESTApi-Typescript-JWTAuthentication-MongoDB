import { Request, Response } from "express";
import User from "../models/User";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find().populate("roles");
  return res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const { idUser } = req.params;
  const user = await User.findById(idUser).populate("roles");
  return res.json(user);
};
