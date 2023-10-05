import { Router } from "express"
import httpDistribucion from "../controllers/distribucionPresupuesto.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersPresupuesto from "../helpers/presupuesto.js";

const router=new Router()

// Get
router.get('/all', validarJWT, httpDistribucion.obtenerAllDistribucion)

// Post
router.post('/agregar',[
    validarJWT,
    check("idLote", "ID no válido").isMongoId(),
    check("idItem", "ID no válido").isMongoId(),
    check("presupuesto", "Ingrese un presupuesto").not().isEmpty(),
    check("presupuesto", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto), 
    validarCampos
],httpDistribucion.agregarDistribucion)

// Put
router.put('/editar', [
    validarJWT,
    check("id", "ID no válido").isMongoId(),
    check("presupuesto", "Ingrese un presupuesto").not().isEmpty(),
    check("presupuesto", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto), 
    validarCampos
], httpDistribucion.editarDistribucion)

router.put('/inactivar', [
    validarJWT,
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpDistribucion.inactivarDistribucion)

router.put('/activar', [
    validarJWT,
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpDistribucion.activarDistribucion)

export default router
