import app from './app'

app.listen(app.get("port"))
console.log('Server running in port: ', app.get("port"))

