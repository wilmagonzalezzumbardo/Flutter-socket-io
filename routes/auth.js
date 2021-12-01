/*
routes
api/login

*/
const {Router} = require ('express');
const { check } = require('express-validator');
const { crearUsuario, login, renew } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

/*
router.post('/new', (req, res = response)=>{
    res.json({
        ok: true,
        msg: 'Crear usuario'
    });
});
*/
router.post('/new', [
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    check("email", "el correo no es válido").normalizeEmail().isEmail(),
    check("email", "ingrese un correo").not().isEmpty(),
    check("password", "ingrese una contraseña").not().isEmpty(),
    validarCampos
], crearUsuario);

// ruta, middleawer, controllador
router.post('/', [
    check("email", "El correo no es valido").normalizeEmail().isEmail(),
    check('email', "ingrese un correo").not().isEmpty(),
    check("password", "ingrese una contraseña").not().isEmpty(),
], login
);

router.get(
    '/renew',
    validarJWT,
    renew
);
module.exports = router;