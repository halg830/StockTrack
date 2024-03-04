import { Router } from "express"
import httpDistribucion from "../controllers/distribucionPresupuesto.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersPresupuesto from "../helpers/presupuesto.js";
import helpersDisPresupuesto from "../helpers/distribucionPresupuesto.js";
import { validarRolAdmin } from "../middlewares/validar-rol.js";

const router=new Router()

// Get
router.get('/all', validarJWT, httpDistribucion.getAll)
router.get('/buscarId/:id',[
    validarJWT,
    validarRolAdmin,
    check('id','Digite el id de la distribucion').not().isEmpty(),
    check('id','Digite el id de la distribucion').isMongoId(),
    validarCampos
],httpDistribucion.getDistribucionById)

router.get('/distribucion/:idItem',[
    validarJWT,
    validarRolAdmin,
    check('idItem','Digite el id de la distribucion').not().isEmpty(),
    check('idItem','Digite el id de la distribucion').isMongoId(),
    validarCampos
],httpDistribucion.getDistribucionesById)
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
    check("idItem", "ID no válido").custom(helpersDisPresupuesto.validarDisPreUnica),
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

router.put('/ajustarPresupuesto/:id',[
    validarJWT,
    validarRolAdmin,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    check("presupuesto","No hay ningun presupuesto").not().isEmpty(),
    validarCampos,
], httpDistribucion.putAjustarPresupuesto)

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
