const { io } = require('../index');

//mensajes de sockets
io.on('connection', client => {
    console.log('cliente conectado desde js');
    client.on('disconnect', () => {
        console.log('cliente desconectado desde js')
    });

    client.on('mensaje', (payload) => {
        console.log ('mensaje ', payload);

        io.emit('mensaje', {admin: 'nuevo mensaje'});
    });

});