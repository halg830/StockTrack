import { Router } from "express"
import httpItem from "../controllers/itemPresupuesto.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersPresupuesto from "../helpers/presupuesto.js";
import { validarRolAdmin } from "../middlewares/validar-rol.js";
import helpersItem from "../helpers/itemPresupuesto.js";

const router=new Router()

// Get
router.get('/all', validarJWT, httpItem.getAll)
router.get('/buscarNombre/:nombre', validarJWT, httpItem.getPorNombre) 

// Post
router.post('/agregar',[
  validarJWT,
  validarRolAdmin,
    check("nombre", "Ingrese un nombre").not().isEmpty(),
    check('nombre').custom(helpersItem.existeNombre),
    check("presupuesto", "Ingrese un presupuesto").not().isEmpty(),
    check("presupuesto", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto), 
    check('year', 'Ingrese un año').not().isEmpty(),
    validarCampos
],httpItem.post)

// Put
router.put('/editar/:id', [
  validarJWT,
  validarRolAdmin,
    check("id", "ID no válido").isMongoId(),
    check("nombre", "Ingrese un nombre").not().isEmpty(),
    check('nombre').custom(helpersItem.existeNombre),
    check("presupuesto", "Ingrese un presupuesto").not().isEmpty(),
    check("presupuesto", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto), 
    check('year', 'Ingrese un año').not().isEmpty(),
    validarCampos
], httpItem.putEditar)

router.put('/inactivar/:id', [
  validarJWT,
  validarRolAdmin,
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpItem.putInactivar)

router.put('/activar/:id', [
  validarJWT,
  validarRolAdmin,
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpItem.putActivar)

export default router