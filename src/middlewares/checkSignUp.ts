import { NextFunction, Request, Response } from "express";
//import { ROLES } from "../models/Role";
import User from "../models/User";

export const checkUsernameAndEmailExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = await User.findOne({ email: req.body.email });
  if (email)
    return res.status(400).json({
      msg: "Email already exists!",
    });

  const username = await User.findOne({ username: req.body.username });
  if (username)
    return res.status(400).json({
      msg: "Username already exists!",
    });

  next();
};


