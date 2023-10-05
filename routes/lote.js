import { Router } from "express"
import httpLote from "../controllers/lote.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersPresupuesto from "../helpers/presupuesto.js";

const router=new Router()

// Get
router.get('/all', httpLote.obtenerLotes)
router.get('/buscar/:nombre', httpLote.buscarLote) 

// Post
router.post('/agregar',[
    check("nombre", "Ingrese un nombre").not().isEmpty(),
    check("nombre", "El nombre debe tener menos de 15 caracteres").isLength({max:15}),
    check("presupuesto", "Ingrese un presupuesto").not().isEmpty(),
    check("presupuesto", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto), 
    validarCampos
],httpLote.agregarLote)

// Put
router.put('/editar', [
    check("id", "ID no válido").isMongoId(),
    check("presupuesto", "Ingrese un presupuesto").not().isEmpty(),
    check("presupuesto", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto), 
    validarCampos
], httpLote.editarLote)

router.put('/inactivar', [
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpLote.inactivarLote)

router.put('/activar', [
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpLote.activarLote)

export default router