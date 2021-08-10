import { NextFunction, Request, Response } from "express";
import { ROLES } from "../models/Role";
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

export const checkRolesExists = async (req: Request, res: Response, next: NextFunction)=>{
    const arrayRoles: Array<string> = req.body.roles 

    if(req.body.roles) {
        for (let i = 0; i < arrayRoles.length; i++) {
            if(!ROLES.includes(arrayRoles[i])) {
                return res.status(401).json({
                    msg: `Role ${arrayRoles[i]} does not exixts`
                })
            }           
        }
    }

    next()
}
