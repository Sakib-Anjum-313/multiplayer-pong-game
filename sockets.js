let readyPlayerCount = 0;

function listen(io) {
  const pongNamespace = io.of("/pong");

  // io.on("connection", (socket) => {
  pongNamespace.on("connection", (socket) => {
    let room;

    console.log("a user connected", socket.id);

    socket.on("ready", () => {
      room = "room" + Math.floor(readyPlayerCount / 2);
      socket.join(room);
      console.log("Player Ready", socket.id, room);
      readyPlayerCount++;
      if (readyPlayerCount % 2 === 0) {
        // broadcast('startGame')
        pongNamespace.emit("startGame", socket.id);
      }
    });

    socket.on("paddleMove", (paddleData) => {
      socket.broadcast.emit("paddleMove", paddleData);
    });

    socket.on("ballMove", (ballData) => {
      socket.broadcast.emit("ballMove", ballData);
    });

    socket.on("disconnect", (reason) => {
      console.log(`CLIENT ${socket.id} disconnected : ${reason}`);
      socket.leave(room);
    });
  });
}

module.exports = {
  listen,
};
