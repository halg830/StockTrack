import { Router } from "express"
import httpDisContratoLote from "../controllers/disContratoLote.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersPresupuesto from "../helpers/presupuesto.js";
import helpersDisContratoLote from "../helpers/disContratoLote.js";
import { validarRolAdmin } from "../middlewares/validar-rol.js";

const router=new Router()

// Get
router.get('/all', validarJWT, httpDisContratoLote.getAll)
router.get('/buscarId/:id',[
    validarJWT,
    validarRolAdmin,
    check('id','Digite el id de la distribucion').not().isEmpty(),
    check('id','Digite el id de la distribucion').isMongoId(),
    validarCampos
],httpDisContratoLote.getDistribucionesById)

// router.get('/distribucion/:idItem',[
//     validarJWT,
//     validarRolAdmin,
//     check('idItem','Digite el id de la distribucion').not().isEmpty(),
//     check('idItem','Digite el id de la distribucion').isMongoId(),
//     validarCampos
// ],httpDisContratoLote.getDistribucionesById)
// Post
router.post('/agregar',[
    validarJWT,
    validarRolAdmin,
    check("presupuestoAsignado", "Ingrese un presupuesto").not().isEmpty(),
    check("presupuestoAsignado", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto), 
    check("idContrato", "ID no válido").not().isEmpty(),
    check("idContrato", "ID no válido").isMongoId(),
    check("idContrato", "ID no válido").custom(helpersDisContratoLote.existeDistribucion),
    check("idLote", "ID no válido").not().isEmpty(),
    check("idLote", "ID no válido").isMongoId(),
    check('year', 'Ingrese un año').not().isEmpty(),
    validarCampos
],httpDisContratoLote.post)

// Put
router.put('/editar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digitel el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    check("presupuestoAsignado", "Ingrese un presupuesto").not().isEmpty(),
    check("presupuestoAsignado", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto), 
    check("idContrato", "ID no válido").not().isEmpty(),
    check("idContrato", "ID no válido").isMongoId(),
    check("idContrato", "ID no válido").custom(helpersDisContratoLote.existeDistribucion),
    check("idLote", "ID no válido").not().isEmpty(),
    check("idLote", "ID no válido").isMongoId(),
    check('year', 'Ingrese un año').not().isEmpty(),
    validarCampos
], httpDisContratoLote.putEditar)

router.put('/ajustarPresupuesto/:id',[
    validarJWT,
    validarRolAdmin,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    check("presupuestoAsignado","No hay ningun presupuesto").not().isEmpty(),
    validarCampos,
], httpDisContratoLote.putAjustarPresupuesto)

router.put('/inactivar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digitel el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpDisContratoLote.putInactivar)

router.put('/activar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digitel el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpDisContratoLote.putActivar)

export default router
