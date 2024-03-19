import { Router } from "express"
import httpRedConocimiento from "../controllers/redConocimiento.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";
import {validarRolAdmin} from "../middlewares/validar-rol.js";
import helpersRedConocimiento from "../helpers/redConocimiento.js";

const router=new Router()

// Get
router.get('/all', validarJWT, httpRedConocimiento.getAll)
router.get('/buscarNombre/:nombre', validarJWT, httpRedConocimiento.getPorNombre) 

// Post
router.post('/agregar',[
    validarJWT,
    validarRolAdmin,
    check("nombre", "Ingrese un nombre").not().isEmpty(),
    check('nombre').custom(helpersRedConocimiento.existeNombre),
    validarCampos
],httpRedConocimiento.post)

// Put
router.put('/editar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "ID no válido").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    check("nombre", "Ingrese un nombre").not().isEmpty(),
    check('nombre').custom(helpersRedConocimiento.existeNombre),
    validarCampos
], httpRedConocimiento.putEditar)


router.put('/inactivar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digite el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpRedConocimiento.putInactivar)

router.put('/activar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digite el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpRedConocimiento.putActivar)

export default router