import { Router } from "express"
import httpPersona from "../controllers/persona.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";

const router=new Router()

router.post('/registro',[
    check("nombre", "Digite el nombre").not().isEmpty(),
    check("identificacion", "Digite la identificacion").not().isEmpty(),
    check("nombreUsuario", "Digite el nombre de usuario").not().isEmpty(),
    check("correo", "Digite el correo").not().isEmpty(),
    check("correo", "Digite el correo").isEmail(),
    check("telefono", "Digite el telefono").not().isEmpty(),
    check("codigoRol", "Digite el codigo del rol").not().isEmpty(),
    check("contraseña", "Digite la contraseña").not().isEmpty(),
    validarCampos
],httpPersona.registroVendedor)

export default router
