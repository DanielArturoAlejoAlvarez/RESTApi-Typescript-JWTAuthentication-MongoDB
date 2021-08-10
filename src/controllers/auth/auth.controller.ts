import config from '../../config/config'

import User,{IUser} from '../../models/User'
import { Request,Response } from 'express'
import jwt from 'jsonwebtoken'
import Role from 'models/Role'

export const signUp = async (req: Request,res: Response)=>{

    try {
        console.log(req.body)
        const {displayName,email,username,password,avatar,roles,status} = req.body
        const newUser: IUser = new User({
            displayName,
            email,
            username,
            password,
            avatar,
            status
        })

        newUser.encryptPassword(password)

        //roles
        if (req.body.roles) {
            const arrayRoles = await Role.find({name: {$in: roles}})
            newUser.roles = arrayRoles.map((role: any)=>role._id)
        }else {
            const role = Role.findOne({name: "USER"})
            newUser.roles = [role._id]
        }

        const user = await newUser.save()
        console.log(user)

        const token = jwt.sign({id: user._id}, config.secret_key,{
            expiresIn: 60*60
        })

        return res.status(200).json({
            msg: 'User registered successfully!',
            token,
            user
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }

}

export const signIn = async (req: Request,res: Response)=>{
    
}

export const profile = async (req: Request,res: Response)=>{
    
}