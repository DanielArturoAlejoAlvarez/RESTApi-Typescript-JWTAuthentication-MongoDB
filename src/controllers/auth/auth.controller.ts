import User,{IUser} from '../../models/User'
import { Request,Response } from 'express'
//import jwt from 'jsonwebtoken'

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
        const user = await newUser.save()
        return res.json({
            msg: 'User registered successfully!',
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