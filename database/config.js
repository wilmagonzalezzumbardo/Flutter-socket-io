require('dotenv').config();
const mongoose = require ('mongoose');
const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.DB_CNN);

        console.log ('iniciando la configuracion de la base de datos');
        console.log('DB ONLINE');
    }
    catch (error)
    {
        console.log ( error + 'Error al tratar de conectarse a la base de datos');
        throw new Error ('Error en la base de datos, hable con el admin');
    }
}

module.exports = {
    dbConnection
};