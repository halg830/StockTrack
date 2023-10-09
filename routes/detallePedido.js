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
    check('id', "Digite el id").isMongoId(),
    validarCampos
],httpDetallePedido.getDetallePedidoById)

router.post('/agregarDetallePedido',[
    validarJWT,
    check('cantidad', "Digite la Cantidad").not().isEmpty(),
    check('idPedido', "Digite el id del pedido").not().isEmpty(),
    check('idPedido', "Digite el id del pedido").isMongoId(),
    check('idProducto', "Digite el id del pedido").not().isEmpty(),
    check('idProducto', "Digite el id del pedido").isMongoId(),
    validarCampos
],httpDetallePedido.postDetallePedido)

router.put('/editarDetallePedido/:id',[
    validarJWT,
    check('id', "Digite el id").not().isEmpty(),
    check('id', "Digite el id").isMongoId(),
    check('cantidad', "Digite la Cantidad").not().isEmpty(),
    validarCampos
],httpDetallePedido.putEditarDetallePedido)

// router.delete('/borrarDetallePedido/:id',[
//     validarJWT,
//     check('id', "Digite el id").not().isEmpty(),
//     check('id', "Digite el id").isMongoId(),
//     validarCampos
// ],httpDetallePedido.deleteDetallePedido)

router.put('/inactivarDetallePedido/:id',[
    validarJWT,
    check('id', "Digite el id").not().isEmpty(),
    check('id', "Digite el id").isMongoId(),
    validarCampos
],httpDetallePedido.putDetallePedidoInactivar)

export default router
