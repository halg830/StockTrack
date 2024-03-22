import { Router } from "express"
import httpContrato from "../controllers/contrato.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersPresupuesto from "../helpers/presupuesto.js";
import { validarRolAdmin } from "../middlewares/validar-rol.js";
import helpersContrato from "../helpers/contrato.js";

const router=new Router()

// Get
router.get('/all', validarJWT, httpContrato.getAll)
router.get('/buscarNombre/:nombre', validarJWT, httpContrato.getPorNombre) 
router.get('/buscarId/:id', [ 
  validarJWT,
  validarRolAdmin,
  check('id', 'Digite el id').not().isEmpty(),
  check('id', 'Digite el id').isMongoId(),
  validarCampos,
], httpContrato.getById) 


// Post
router.post('/agregar',[
  validarJWT,
  validarRolAdmin,
    check("nombre", "Ingrese un nombre").not().isEmpty(),
    check('nombre').custom(helpersContrato.existeNombre),
    check("codigo", "Ingrese un codigo").not().isEmpty(),
    check('codigo').custom(helpersContrato.existeCodigo),
    check("presupuestoAsignado", "Ingrese un presupuesto").not().isEmpty(),
    check("presupuestoAsignado", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto),
    validarCampos
],httpContrato.post)

// Put
router.put('/editar/:id', [
  validarJWT,
  validarRolAdmin,
    check("id", "ID no válido").isMongoId(),
    check("nombre", "Ingrese un nombre").not().isEmpty(),
    check('nombre').custom(helpersContrato.existeNombre),
    check("codigo", "Ingrese un codigo").not().isEmpty(),
    check('codigo').custom(helpersContrato.existeCodigo),
    check("presupuestoAsignado", "Ingrese un presupuesto").not().isEmpty(),
    check("presupuestoAsignado", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto),
    validarCampos
], httpContrato.putEditar)

router.put('/ajustarPresupuesto/:id',[
  validarJWT,
    validarRolAdmin,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    check("presupuestoAsignado","No hay ningun presupuesto").not().isEmpty(),
    validarCampos,
],httpContrato.putAjustarPresupuesto)

router.put('/inactivar/:id', [
  validarJWT,
  validarRolAdmin,
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpContrato.putInactivar)

router.put('/activar/:id', [
  validarJWT,
  validarRolAdmin,
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpContrato.putActivar)

export default router