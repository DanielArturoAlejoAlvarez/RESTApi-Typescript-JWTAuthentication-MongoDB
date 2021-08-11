import { NextFunction, Request, Response } from "express";
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

export const saveUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { displayName, email, username, password, avatar, status } =
    req.body;

  const newUser = new User({
    displayName,
    email,
    username,
    password,
    avatar,
    status,
  });

  const user = await newUser.save();

  return res.status(201).json({
    msg: "User saved successfully!",
    user,
  });
};
