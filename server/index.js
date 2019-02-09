const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const socket_io = require('socket.io');
const http = require('http');

const app = express();
const port = process.env.PORT || 3000;
const server = http.Server(app);
const io = socket_io(server);

server.listen(80);

app.use('/', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

io.on('connection', (socket) => {
  console.log(`A client with ID ${socket.id} is connected`);

  socket.on('request-color-change', (data) => {
    io.emit('trigger-color-change', {color: data.color});
  });
});

io.on('disconnect', (socket) => {
  console.log(`A client with ID ${socket.id} is disconnected`);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
