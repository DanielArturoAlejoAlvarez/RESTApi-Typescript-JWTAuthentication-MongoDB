import User from '../../models/User'
import { Request,Response } from 'express'

export const signUp = async (req: Request,res: Response)=>{

    try {
        console.log(req.body)
        const {displayName,email,username,password,avatar,roles,status} = req.body
        const newUser = new User({
            displayName,
            email,
            username,
            password,
            avatar,
            roles,
            status
        })

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