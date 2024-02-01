import { Router } from "express"
import httpUsuario from "../controllers/usuario.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersUsuario from "../helpers/usuario.js";

const router=new Router()

router.post('/registro',[
    validarJWT,
    check("nombre", "Digite el nombre").not().isEmpty(),
    check("identificacion", "Digite la identificacion").not().isEmpty(),
    check("correo", "Digite el correo").not().isEmpty(),
    check("correo", "Digite el correo").isEmail(),
    check("telefono", "Digite el telefono").not().isEmpty(),
    check("rol", "Digite el codigo del rol").not().isEmpty(),
    check("rol", "Rol no válido: admin, instructor, bodega").custom(helpersUsuario.validarRol),
    check("password", "La contraseña debe contener al menos 1 mayúscula, 1 minúscula, al menos 2 números y un carácter especial").custom(helpersUsuario.validarPassword),
    validarCampos
],httpUsuario.registroUsuario)

router.post("/login",[
    check('identificacion',"Digite su identificacion").not().isEmpty(),
    check('password', "Digite la contraseña").not().isEmpty(),
], httpUsuario.login)

router.post('/recuperar-password', httpUsuario.recuperarPassword)

router.put('/cambioPassword/:id',[
    validarJWT,
    check('id', "Digite el id").not().isEmpty(),
    check('id', "No es mongo id").isMongoId(),
    check('password', "Digite la contraseña").not().isEmpty(),
    check('newPassword', "Digite la nueva contraseña").not().isEmpty()
],httpUsuario.putCambioPassword)

router.get('/logOut',[
    validarJWT
],httpUsuario.logOut)
export default router
