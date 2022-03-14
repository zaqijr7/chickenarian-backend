// <------------ Import Modules ------------>
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')

// <------------ Config ------------>
dotenv.config()
const { APP_PORT } = process.env
const app = express()
const server = require('http').createServer(app)
// const io = require('socket.io')(server, {
//   cors: {
//     origin: '*'
//   }
// })

// io.on('connection', () => {
//   console.log('a user connected')
// })

// const socket = require('./src/middlewares/socket')
// app.use(socket(io))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'))
app.use(cors('*'))
app.use('/uploads', express.static('uploads'))

// <----------ROUTER---------->

// <----------URL PORT---------->
app.get('/', (req, res) => {
  res.send({
    success: true,
    message: 'Backend running!'
  })
})

server.listen(APP_PORT, () => {
  console.log(`Application is running opn port ${APP_PORT}`)
})