const {response} = require ('express');
const bcrypt = require ('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async  (req, res = response) => {
    const {email, password} = req.body;
    try {
        const existeEmail =  await Usuario.findOne({email: email});
        if (existeEmail) 
        {
            return res.status(400).json ({
                ok: false,
                msg: 'El correo electrónico ya esta registrado previamente'
            });
        }
        const usuario = new Usuario(req.body);
        // encriptar contraseña
        //el salt es utilizado en criptologia, para generar números aleatorios,  que aun cuando dos usuarios tengan la misma contraseña en la bd 
        //se mostrará como dos diferentes, pero internamente son la misma
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        await usuario.save();
        const token = await generarJWT(usuario.id);
        console.log ('despues de guardar el usaurio');

        //creacion del jwt, json web token
        //un jwt, esta compuesto de tres partes, el header, el payload y la firma
        //requiere una semilla para la encriptacion de dicha informacion
        //const token = await generarJWT(usuario.id);    //

        /*
        res.json({
            ok: true,
            msg: req.body
        });
        */
        res.json({
            ok: true,
            msg: usuario,
            token: token
        });
    } catch(error){
        console.log (error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error hable con el admin' ,
            error: error

        });
    }
    
    
};


const login = async (req, res = response) => {
    const {email, password, token} = req.body;
    console.log (email);
    console.log(password);
    try {
        const usuarioDB =  await Usuario.findOne({email: email});
        if ( !usuarioDB) 
        {
            return res.status(404).json ({
                ok: false,
                msg: 'El correo electrónico no existe'
            });
        }
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json ({
                ok: false,
                msg: 'El password no es correcto'
            });
        }

        const token = await generarJWT(usuarioDB.id);
        console.log ('despeus de crear el token');
        res.json({
            ok: true,
            msg: 'Login correcto',
            usuario: usuarioDB,
            token: token
        });
    } catch(error){
        console.log (error);
        res.status(500).json({
            ok: false,
            msg: '111Hubo un error al validar el login hable con el admin' ,
            error: error
        });
    }
};

const renew = async(req, res = response) => {
    const uid = req.uid;
    const token = await generarJWT(uid);
    const usuarioDB =  await Usuario.findById(uid);
    res.json(
        {
            ok: true,
            msg: 'Renew',
            uid : req.uid,
            usuariodb: usuarioDB
        }
    );
}

module.exports = {
    crearUsuario,
    login,
    renew
};