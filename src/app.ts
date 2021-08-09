import config from './config/config'
import express,{ Application } from 'express'

const app: Application = express()


app.set("port", config.port)

export default app