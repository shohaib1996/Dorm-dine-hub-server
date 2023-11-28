require('dotenv').config()
const http = require('http')
const app = require('./src/app')
const connectToDb = require('./src/db/connectToDb')
const server = http.createServer(app)
const port = process.env.PORT || 5000
const main = async() => {
    await connectToDb()
    server.listen(port, ()=> {
        console.log('server is listening on port', port);
    })
}

main()