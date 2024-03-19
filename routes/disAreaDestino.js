import { Router } from "express"
import httpDisAreaDestino from "../controllers/disAreaDestino.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersPresupuesto from "../helpers/presupuesto.js";
import helpersDisAreaDestino from "../helpers/disAreaDestino.js";
import { validarRolAdmin } from "../middlewares/validar-rol.js";

const router=new Router()

// Get
router.get('/all', validarJWT, httpDisAreaDestino.getAll)
router.get('/buscarId/:id',[
    validarJWT,
    validarRolAdmin,
    check('id','Digite el id de la distribucion').not().isEmpty(),
    check('id','Digite el id de la distribucion').isMongoId(),
    validarCampos
],httpDisAreaDestino.getDistribucionesById)

// router.get('/distribucion/:idItem',[
//     validarJWT,
//     validarRolAdmin,
//     check('idItem','Digite el id de la distribucion').not().isEmpty(),
//     check('idItem','Digite el id de la distribucion').isMongoId(),
//     validarCampos
// ],httpDisAreaDestino.getDistribucionesById)
// Post
router.post('/agregar',[
    validarJWT,
    validarRolAdmin,
    check("presupuestoAsignado", "Ingrese un presupuesto").not().isEmpty(),
    check("presupuestoAsignado", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto), 
    check("idDestino", "ID no válido").not().isEmpty(),
    check("idDestino", "ID no válido").isMongoId(),
    check("idDestino", "ID no válido").custom(helpersDisAreaDestino.existeDistribucion),
    check("idDisRedArea", "ID no válido").not().isEmpty(),
    check("idDisRedArea", "ID no válido").isMongoId(),
    check('year', 'Ingrese un año').not().isEmpty(),
    validarCampos
],httpDisAreaDestino.post)

// Put
router.put('/editar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digitel el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    check("presupuestoAsignado", "Ingrese un presupuesto").not().isEmpty(),
    check("presupuestoAsignado", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto), 
    check("idDestino", "ID no válido").not().isEmpty(),
    check("idDestino", "ID no válido").isMongoId(),
    check("idDestino", "ID no válido").custom(helpersDisAreaDestino.existeDistribucion),
    check("idDisRedArea", "ID no válido").not().isEmpty(),
    check("idDisRedArea", "ID no válido").isMongoId(),
    check('year', 'Ingrese un año').not().isEmpty(),
    validarCampos
], httpDisAreaDestino.putEditar)

router.put('/ajustarPresupuesto/:id',[
    validarJWT,
    validarRolAdmin,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    check("presupuestoAsignado","No hay ningun presupuesto").not().isEmpty(),
    validarCampos,
], httpDisAreaDestino.putAjustarPresupuesto)

router.put('/inactivar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digitel el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpDisAreaDestino.putInactivar)

router.put('/activar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digitel el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpDisAreaDestino.putActivar)

export default router
