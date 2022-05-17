// <------------ Import Modules ------------>
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const cron = require('node-cron');
const router = require("./src/routers/index");
const dateFormater = require("./src/helpers/dateFormater")
const siclusPets = require('./src/controllers/pets')
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

cron.schedule('1 * * * * *', (time) => {
  // console.log('running a task every ', dateFormater(time));
  // console.log(dateFormater(time));
  const dateRange = time.getTime() - 172800000;
  console.log(dateFormater(dateRange));
  siclusPets.siclusPets({ dateBefore: '1990-01-01 00:00:00', dateAfter: dateFormater(dateRange) });
  // siclusPets.siclusPets({dateBefore : dateFormater(dateRange), dateAfter: dateFormater(time)});
  // console.log(dateFormater(dateBefore) + ' - ' + dateFormater(time));
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

//test push