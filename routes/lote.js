import { Router } from "express"
import httpLote from "../controllers/lote.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";
// import helpersPresupuesto from "../helpers/presupuesto.js";
import {validarRolAdmin} from "../middlewares/validar-rol.js";

const router=new Router()

// Get
router.get('/all', validarJWT, httpLote.getAll)
router.get('/buscarNombre/:nombre', validarJWT, httpLote.getPorNombre) 

// Post
router.post('/agregar',[
    validarJWT,
    validarRolAdmin,
    check("codigo", "Ingrese el codigo del lote").not().isEmpty(),
    check("nombre", "Ingrese un nombre").not().isEmpty(),
    check("descripcion", "Ingrese una descripción").not().isEmpty(),
    validarCampos
],httpLote.post)

// Put
router.put('/editar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "ID no válido").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    check("codigo", "Ingrese el codigo del lote").not().isEmpty(),
    check("nombre", "Ingrese un nombre").not().isEmpty(),
    check("descripcion", "Ingrese una descripción").not().isEmpty(),
    validarCampos
], httpLote.putEditar)

router.put('/inactivar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digite el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpLote.putInactivar)

router.put('/activar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digite el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpLote.putActivar)

export default router