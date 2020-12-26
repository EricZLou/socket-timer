const io = require("./index.js").io;
let num_connections = 0;
let table = [];

module.exports = function(socket) {
  // LOG IN
  socket.on('login', () => {
    console.log(`${socket.id} signed in`);
    socket.join('room 1');
    table.push(socket.id);
    num_connections++;
    if (table.length === 4) {
      io.to(table[0]).emit('show', true);
    }
  });

  // CARD CLICKED
  socket.on('clicked', () => {
    console.log(`${socket.id} clicked`);
    io.to('room 1').emit('show', false);
    io.to(table[(table.indexOf(socket.id)+1) % 4]).emit('show', true);
  });
}
