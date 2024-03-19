import { Router } from "express"
import httpDisDependenciaRed from "../controllers/disDependenciaRed.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersPresupuesto from "../helpers/presupuesto.js";
import helpersDisDependenciaRed from "../helpers/disDependenciaRed.js";
import { validarRolAdmin } from "../middlewares/validar-rol.js";

const router=new Router()

// Get
router.get('/all', validarJWT, httpDisDependenciaRed.getAll)
router.get('/buscarId/:id',[
    validarJWT,
    validarRolAdmin,
    check('id','Digite el id de la distribucion').not().isEmpty(),
    check('id','Digite el id de la distribucion').isMongoId(),
    validarCampos
],httpDisDependenciaRed.getDistribucionById)

router.get('/distribucion/:idItem',[
    validarJWT,
    validarRolAdmin,
    check('idItem','Digite el id de la distribucion').not().isEmpty(),
    check('idItem','Digite el id de la distribucion').isMongoId(),
    validarCampos
],httpDisDependenciaRed.getDistribucionesById)
// Post
router.post('/agregar',[
    validarJWT,
    validarRolAdmin,
    check("presupuestoAsignado", "Ingrese un presupuesto").not().isEmpty(),
    check("presupuestoAsignado", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto), 
    check("idDependencia", "ID no válido").not().isEmpty(),
    check("idDependencia", "ID no válido").isMongoId(),
    check("idDependencia", "ID no válido").custom(helpersDisDependenciaRed.existeDistribucion),
    check("idRed", "ID no válido").not().isEmpty(),
    check("idRed", "ID no válido").isMongoId(),
    check('year', 'Ingrese un año').not().isEmpty(),
    validarCampos
],httpDisDependenciaRed.post)

// Put
router.put('/editar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digitel el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    check("presupuestoAsignado", "Ingrese un presupuesto").not().isEmpty(),
    check("presupuestoAsignado", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto), 
    check("idDependencia", "ID no válido").not().isEmpty(),
    check("idDependencia", "ID no válido").isMongoId(),
    check("idDependencia", "ID no válido").custom(helpersDisDependenciaRed.existeDistribucion),
    check("idRed", "ID no válido").not().isEmpty(),
    check("idRed", "ID no válido").isMongoId(),
    check('year', 'Ingrese un año').not().isEmpty(),
    validarCampos
], httpDisDependenciaRed.putEditar)

router.put('/ajustarPresupuesto/:id',[
    validarJWT,
    validarRolAdmin,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    check("presupuestoAsignado","No hay ningun presupuesto").not().isEmpty(),
    validarCampos,
], httpDisDependenciaRed.putAjustarPresupuesto)

router.put('/inactivar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digitel el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpDisDependenciaRed.putInactivar)

router.put('/activar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digitel el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpDisDependenciaRed.putActivar)

export default router
