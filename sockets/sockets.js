const { io } = require('../index');
const Band = require('../public/models/band');
const Bands = require('../public/models/bands');

const bands = new Bands();
console.log('init server willll');
bands.addBand(new Band('Queen'));
bands.addBand(new Band('BonJovi'));
bands.addBand(new Band('El tri'));
console.log(bands);

//mensajes de sockets
io.on('connection', client => {
    console.log('cliente conectado desde js');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('cliente desconectado desde js')
    });

    client.on('mensaje', (payload) => {
        console.log ('mensaje ', payload);

        io.emit('mensaje', {admin: 'nuevo mensaje'});
    });

    client.on('emitir-mensaje', (payload) => {
        console.log ('emitir-mensaje ', payload);

        //io.emit('emitir-mensaje', {admin: 'emitir-mensaje ' + payload}); //emite a todos incluyendo al emisor
        client.broadcast.emit('emitir-mensaje',payload); //incluye a todos menos al emisor
    });

    client.on('vote-band', (payload) => {
        console.log ('vote-band ', payload);
        bands.voteBand(payload.id);


        io.emit('active-bands', bands.getBands()); //emite a todos incluyendo al emisor
    });

    client.on('add-band', (payload) => {
        console.log ('vote-band ', payload);
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands()); //emite a todos incluyendo al emisor
    });

    client.on('del-band', (payload) => {
        console.log ('del-band ', payload);
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands()); //emite a todos incluyendo al emisor
    });

});