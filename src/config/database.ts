import config from './config'
import mongoose from 'mongoose'

mongoose.connect(config.mongodb_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(db=>console.log('DB is connect!!'))
    .catch(err=>console.log(err))