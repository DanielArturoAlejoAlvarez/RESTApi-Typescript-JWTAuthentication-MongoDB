import { NextFunction, Request, Response } from "express";
import Role from "../models/Role";
import User, { IUser } from "../models/User";

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
  const { displayName, email, username, password, avatar, roles } =
    req.body;

  const newUser = new User({
    displayName,
    email,
    username,
    password,
    avatar,
  });

  newUser.password = (await newUser.encryptPassword(password)).toString();

  if (req.body.roles) {
    const arrayRoles = await Role.find({ name: { $in: roles } });
    newUser.roles = arrayRoles.map((role: any) => role._id);
  } else {
    const role = await Role.findOne({ name: "USER" });
    newUser.roles = [role._id];
  }

  const user = await newUser.save();

  return res.status(201).json({
    msg: "User saved successfully!",
    user,
  });
};

export const updateUser = async (req: Request, res: Response, next: NextFunction)=>{
  const { idUser } = req.params 
  const { displayName, email, username, password, avatar, roles, status } =
  req.body;

  const updUser: any = {
    displayName,
    email,
    username,
    password,
    avatar,
    status
  };

  if (req.body.roles) {
    const arrayRoles = await Role.find({ name: { $in: roles } });
    updUser.roles = arrayRoles.map((role: any) => role._id);
  } else {
    const role = await Role.findOne({ name: "USER" });
    updUser.roles = [role._id];
  }

  const user = await User.findByIdAndUpdate(idUser, updUser, {
    new: true
  })

  return res.status(201).json({
    msg: 'User updated successfully!',
    user
  })
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction)=>{
  const { idUser } = req.params 

  await User.findByIdAndDelete(idUser)

  return res.status(200).json({
    msg: 'User deleted successfully!'
  })
}


