import { Router } from "express"
import httpDistribucion from "../controllers/distribucionPresupuesto.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersPresupuesto from "../helpers/presupuesto.js";
import { validarRolAdmin } from "../middlewares/validar-rol.js";

const router=new Router()

// Get
router.get('/all', validarJWT, httpDistribucion.getAll)

// Post
router.post('/agregar',[
    validarJWT,
    validarRolAdmin,
    check("presupuesto", "Ingrese un presupuesto").not().isEmpty(),
    check("presupuesto", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto), 
    check("idLote", "ID no válido").not().isEmpty(),
    check("idLote", "ID no válido").isMongoId(),
    check("idItem", "ID no válido").not().isEmpty(),
    check("idItem", "ID no válido").isMongoId(),
    validarCampos
],httpDistribucion.post)

// Put
router.put('/editar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digitel el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    check("presupuesto", "Ingrese un presupuesto").not().isEmpty(),
    check("presupuesto", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto), 
    check("idLote", "ID no válido").not().isEmpty(),
    check("idLote", "ID no válido").isMongoId(),
    check("idItem", "ID no válido").not().isEmpty(),
    check("idItem", "ID no válido").isMongoId(),
    validarCampos
], httpDistribucion.putEditar)

// router.put('/cambioPresupuesto/:id',[
//     validarJWT, 
//     validarRolAdmin,
//     check("id", "Digitel el ID").not().isEmpty(),
//     check("id", "ID no válido").isMongoId(),
//     validarCampos
// ])

router.put('/inactivar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digitel el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpDistribucion.putInactivar)

router.put('/activar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digitel el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpDistribucion.putActivar)

export default router
