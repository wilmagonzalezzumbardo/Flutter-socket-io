const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {
    return new Promise ((resolve, reject) => {
        const payload = 
        {
            uid
        };
        // el jwt_key se crea en el .env
        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, /*  call back */ (err, token) => {
            if (err)
            {
                // no se pudo crear el token
                reject ('No se pudo generar el token JWT');
            }
            else
            {
                //token creado
                resolve (token);
            }
        })
    });
    
}

module.exports = {
    generarJWT
}