import { Schema,model, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
    displayName: string;
    email: string;
    username: string;
    password: string;
    avatar: string;
    roles: any;
    status: boolean;
    encryptPassword(password: string): Promise<string>;
    validatePassword(password: string, receivePassword: string): Promise<boolean> 
}

const userSchema = new Schema({
    displayName: String,
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    username: {
        type: String,
        minLength: 4,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        maxLength: 512
    },
    roles: [
        {
            ref: "Role",
            type: Schema.Types.ObjectId
        }
    ],
    status: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true,
    versionKey: false
})

userSchema.methods.encryptPassword = async (password: string): Promise<string>=>{
    const salt = await bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

userSchema.methods.validatePassword = async (password: string, receivePassword: string): Promise<boolean>=>{
    return await bcrypt.compareSync(password, receivePassword)
}



export default model<IUser>('User', userSchema)