const express = require('express')
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
var cors = require('cors');
const port = 3001

app.use(cors());

io.on('connection', socket => {
  console.log('user connected');

  socket.on("send-data", ( socketId, userName ) => {
    io.to(socketId).emit("receive-user-data", userName);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});



server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })