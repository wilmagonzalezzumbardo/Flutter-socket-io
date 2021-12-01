const jwt = require ('jsonwebtoken');
const validarJWT = (req, res, next) => {
    //leer token, en el header se agregará el token mediante un header personalizado x-token
    const token = req.header('x-token');
    console.log (token);
    if (!token)
    {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }
    try 
    {
        const {uid} =jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;
        
        next();
    } catch (error) 
    {
        return res.status(401).json({
            ok: false,
            msg: 'token no valido'
        });
    }
};

module.exports = {
    validarJWT
}