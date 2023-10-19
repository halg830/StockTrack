import { Router } from "express"
import httpItem from "../controllers/itemPresupuesto.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersPresupuesto from "../helpers/presupuesto.js";

const router=new Router()

// Get
router.get('/all', validarJWT, httpItem.obtenerAllItem)
router.get('/buscar/:nombre', validarJWT, httpItem.buscarItem) 

// Post
router.post('/agregar',[
  validarJWT,
    check("nombre", "Ingrese un nombre").not().isEmpty(),
    check("nombre", "El nombre debe tener menos de 15 caracteres").isLength({max:15}),
    check("presupuesto", "Ingrese un presupuesto").not().isEmpty(),
    check("presupuesto", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto), 
    validarCampos
],httpItem.agregarItem)

// Put
router.put('/editar/:id', [
  validarJWT,
    check("id", "ID no válido").isMongoId(),
    check("presupuesto", "Ingrese un presupuesto").not().isEmpty(),
    check("presupuesto", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto), 
    validarCampos
], httpItem.editarItem)

router.put('/inactivar/:id', [
  validarJWT,
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpItem.inactivarItem)

router.put('/activar/:id', [
  validarJWT,
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpItem.activarItem)

export default router