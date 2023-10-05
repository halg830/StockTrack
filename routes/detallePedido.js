import { Router } from "express"
import httpDetallePedido from "../controllers/detallePedido.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";

const router=new Router()

router.get('/obtenerDetallesPedidos',[
    validarJWT
],httpDetallePedido.getDetallesPedidos)

router.get('/obtenerDetallesById/:id',[
    validarJWT,
    check('id', "Digite el id").not().isEmpty(),
    check('id', "Digite el id").isMongoId()

])

export default router
