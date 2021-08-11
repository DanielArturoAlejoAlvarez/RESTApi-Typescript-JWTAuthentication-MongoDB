import { NextFunction, Request, Response } from "express";
import Role from "../models/Role";
import User from "../models/User";


export const isSuperAdmin = async (req: Request,res: Response,next: NextFunction)=>{
    try {
        const user = await User.findById(req.userId)

        const roles = await Role.findOne({_id: {$in: user?.roles}})

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name==='SUPERADMIN') {
                next()
                return
            }      
        }
        return res.status(403).json({
            msg: 'Require SUPERADMIN Role!'
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

export const isAdmin = async (req: Request,res: Response,next: NextFunction)=>{
    try {
        const user = await User.findById(req.userId)

        const roles = await Role.findOne({_id: {$in: user?.roles}})

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name==='ADMIN') {
                next()
                return
            }      
        }
        return res.status(403).json({
            msg: 'Require ADMIN Role!'
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}