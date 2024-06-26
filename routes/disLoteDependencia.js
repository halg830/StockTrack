import { Router } from "express"
import { check } from "express-validator";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarRolAdmin } from "../middlewares/validar-rol.js";
import validarCampos from "../middlewares/validar.js"
import httpDisLoteDependencia from "../controllers/disLoteDependencia.js";
import helpersPresupuesto from "../helpers/presupuesto.js";
// import helpersDisLoteDependencia from "../helpers/disLoteDependencia.js";
// import helpersDisDependenciaRed from "../helpers/disDependencia.js";
import helpersDisContratoLote from "../helpers/disContratoLote.js";

const router=new Router()

// Get
router.get('/all', validarJWT, httpDisLoteDependencia.getAll)
router.get('/buscarId/:id',[
    validarJWT,
    validarRolAdmin,
    check('id','Digite el id de la distribucion').not().isEmpty(),
    check('id','Digite el id de la distribucion').isMongoId(),
    validarCampos
],httpDisLoteDependencia.getById)

router.get('/distribucion/:idDependencia',[
    validarJWT,
    validarRolAdmin,
    check('idDependencia','Digite el id de la distribucion').not().isEmpty(),
    check('idDependencia','Digite el id de la distribucion').isMongoId(),
    validarCampos
],httpDisLoteDependencia.getDistribucionesById)
// Post
router.post('/agregar',[
    validarJWT,
    validarRolAdmin,
    check("presupuestoAsignado", "Ingrese un presupuesto").not().isEmpty(),
    check("presupuestoAsignado", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto), 
    check("idDisContratoLote", "ID no válido").not().isEmpty(),
    check("idDisContratoLote", "ID no válido").isMongoId(),
    // check("idDisContratoLote", "ID no válido").custom(helpersDisDependenciaRed.existeDistribucion),
    check("idDependencia", "ID no válido").not().isEmpty(),
    check("idDependencia", "ID no válido").isMongoId(),
    check('idDependencia').custom(helpersDisContratoLote.existeDistribucion),
    validarCampos
],httpDisLoteDependencia.post)

// Put
router.put('/editar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digitel el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    check("presupuestoAsignado", "Ingrese un presupuesto").not().isEmpty(),
    check("presupuestoAsignado", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto), 
    check("idDisContratoLote", "ID no válido").not().isEmpty(),
    check("idDisContratoLote", "ID no válido").isMongoId(),
    // check("idDisContratoLote", "ID no válido").custom(helpersDisDependenciaRed.existeDistribucion),
    check("idDependencia", "ID no válido").not().isEmpty(),
    check("idDependencia", "ID no válido").isMongoId(),
    check('idDependencia').custom(helpersDisContratoLote.existeDistribucion),
    validarCampos
], httpDisLoteDependencia.putEditar)

router.put('/ajustarPresupuesto/:id',[
    validarJWT,
    validarRolAdmin,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    check("presupuestoAsignado","No hay ningun presupuesto").not().isEmpty(),
    validarCampos,
], httpDisLoteDependencia.putAjustarPresupuesto)

router.put('/inactivar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digitel el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpDisLoteDependencia.putInactivar)

router.put('/activar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digitel el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpDisLoteDependencia.putActivar)

export default router
