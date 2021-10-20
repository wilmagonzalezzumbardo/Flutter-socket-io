const express = require ('express');
const path = require('path');
require('dotenv').config();

const app = express();
//node server
const server = require ('http').createServer(app);
//const io = require ('socket.io')(server);
module.exports.io = require('socket.io')(server);
require('./sockets/sockets');

/*
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
*/

//carpeta publica
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));


server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log('Servidor corriendo en puerto ' , process.env.PORT );
});
