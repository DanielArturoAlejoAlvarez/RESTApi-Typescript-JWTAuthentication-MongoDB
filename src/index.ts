import app from './app'
import './config/database'


app.listen(app.get("port"))
console.log('Server running in port: ', app.get("port"))

