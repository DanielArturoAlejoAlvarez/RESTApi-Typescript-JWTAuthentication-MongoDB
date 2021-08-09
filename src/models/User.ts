import { Schema,model } from 'mongoose'

const userSchema = new Schema({
    
},{
    timestamps: true,
    versionKey: false
})

export default model('User', userSchema)