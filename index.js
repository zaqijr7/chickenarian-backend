// <------------ Import Modules ------------>
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const cron = require('node-cron');
const router = require("./src/routers/index");
// <------------ Config ------------>
dotenv.config()
const { APP_PORT } = process.env;
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
// app.use('/uploads', express.static('uploads'))

cron.schedule('* * * * * *', (time) => {
  // console.log('running a task every ', time);
  // console.log('running a task every ', time.getMinutes() ,time.getSeconds());
});

// <----------ROUTER---------->
app.use("/api", router);

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