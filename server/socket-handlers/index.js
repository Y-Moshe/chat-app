const registerSetUserAvailability = require('./set-user-availability');

module.exports = ( io ) => ( socket ) => {
  registerSetUserAvailability(io, socket, 'Online');
  socket.on('disconnect', registerSetUserAvailability( io, socket, 'Offline' ));

  console.log('Connection Made!');
}
