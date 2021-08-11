import config from "../../config/config";

import User, { IUser } from "../../models/User";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Role from "../../models/Role";

export const signUp = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { displayName, email, username, password, roles, avatar } = req.body;

    const newUser: IUser = new User({
      displayName,
      email,
      username,
      password,
      avatar,
    });

    newUser.password = (await newUser.encryptPassword(password)).toString();

    //roles
    const role = await Role.findOne({ name: "USER" });
    newUser.roles = [role._id];

    const user = await newUser.save();
    console.log(user);

    const token = jwt.sign({ id: user._id }, config.secret_key, {
      expiresIn: 60 * 60,
    });

    return res.header("auth-token", token).status(200).json({
      msg: "User registered successfully!",
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const signIn = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({
      msg: "User not found!",
    });
  }
  const matchPassword = await user.validatePassword(
    req.body.password,
    user.password
  );

  if (!matchPassword) {
    return res.status(401).json({
      token: null,
      msg: "Password is invalid!",
    });
  }

  const token = jwt.sign({ id: user._id }, config.secret_key, {
    expiresIn: 60 * 60,
  });

  return res.header("auth-token", token).status(200).json({
    msg: "User is loggedin!",
  });
};

export const profile = async (req: Request, res: Response) => {
  const user = await User.findById(req.userId, { password: 0 });
  if (!user)
    return res.status(404).json({
      msg: "User not found!",
    });

  return res.json(user);
};
