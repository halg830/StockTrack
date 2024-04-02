import { Router } from "express"
import httpDisDependencia from "../controllers/disDependencia.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersPresupuesto from "../helpers/presupuesto.js";
import helpersDisDependencia from "../helpers/disDependencia.js";
import { validarRolAdmin } from "../middlewares/validar-rol.js";

const router=new Router()

// Get
router.get('/all', validarJWT, httpDisDependencia.getAll);


router.get('/buscarId/:id',[
    validarJWT,
    validarRolAdmin,
    check('id','Digite el id de la distribucion').not().isEmpty(),
    check('id','Digite el id de la distribucion').isMongoId(),
    validarCampos
],httpDisDependencia.getDistribucionesById)

router.get('/distribucion/:idDistribucion',[
    validarJWT,
    validarRolAdmin,
    check('idDistribucion','Digite el id de la Dependencia').not().isEmpty(),
    check('idDistribucion','Digite el id de la Dependencia').isMongoId(),
    validarCampos
],httpDisDependencia.getDistribucionesById)
// Post
router.post('/agregar',[
    validarJWT,
    validarRolAdmin,
    check("presupuestoAsignado", "Ingrese un presupuesto").not().isEmpty(),
    check("presupuestoAsignado", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto), 
    check("idDependencia", "ID no válido").not().isEmpty(),
    check("idDependencia", "ID no válido").isMongoId(),
    check("idDependencia", "ID no válido").custom(helpersDisDependencia.existeDistribucion),
    validarCampos
],httpDisDependencia.post)

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
    check("idDependencia", "ID no válido").custom(helpersDisDependencia.existeDistribucion),
    validarCampos
], httpDisDependencia.putEditar)

router.put('/ajustarPresupuesto/:id',[
    validarJWT,
    validarRolAdmin,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    check("presupuestoAsignado","No hay ningun presupuesto").not().isEmpty(),
    validarCampos,
], httpDisDependencia.putAjustarPresupuesto)

router.put('/inactivar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digitel el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpDisDependencia.putInactivar)

router.put('/activar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digitel el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpDisDependencia.putActivar)

export default router
