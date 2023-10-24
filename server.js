/*   
Project Name: MultiPlayer Pong Game
Author: SAKIB ANJUM
email: sakibanjum.313@gmail.com
*/

const http = require('http');
const io = require("socket.io");


const apiServer = require('./api');
const httpServer = http.createServer(apiServer);
const socketServer = io(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


const sockets = require('./sockets.js')

const PORT = 3000;

httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

sockets.listen(socketServer);

