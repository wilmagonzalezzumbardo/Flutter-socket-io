const express = require ('express');
const {dbConnection} = require ('./database/config');
dbConnection();

const path = require('path');
require('dotenv').config();

const app = express();

//lectura y parseo del body, peticion del html posteo (post, get) todo esto lo hace express
app.use(express.json());



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

//definir mis rutas, un midleware es una funcion que se ejeucta cuando pasa por ella

app.use('/api/login', require ('./routes/auth.js'));



server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log('Servidor corriendo en puerto ' , process.env.PORT );
});
