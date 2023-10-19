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
    check('id', "No es Mongo Id").isMongoId(),
    validarCampos
],httpDetallePedido.getDetallePedidoById)

router.post('/agregarDetallePedido',[
    validarJWT,
    check('cantidad', "Digite la Cantidad").not().isEmpty(),
    check('idPedido', "Digite el id del pedido").not().isEmpty(),
    check('idPedido', "No es Mongo Id").isMongoId(),
    check('idProducto', "Digite el id del pedido").not().isEmpty(),
    check('idProducto', "No es Mongo Id").isMongoId(),
    validarCampos
],httpDetallePedido.postDetallePedido)

router.put('/editarDetallePedido/:id',[
    validarJWT,
    check('id', "Digite el id").not().isEmpty(),
    check('id', "No es Mongo Id").isMongoId(),
    check('cantidad', "Digite la Cantidad").not().isEmpty(),
    validarCampos
],httpDetallePedido.putEditarDetallePedido)


router.put('/inactivarDetallePedido/:id',[
    validarJWT,
    check('id', "Digite el id").not().isEmpty(),
    check('id', "No es Mongo Id").isMongoId(),
    validarCampos
],httpDetallePedido.putDetallePedidoInactivar)


router.put('/activarDetallePedido/:id',[
    validarJWT,
    check('id', "Digite el id").not().isEmpty(),
    check('id', "No es Mongo Id").isMongoId(),
    validarCampos
],httpDetallePedido.putDetallePedidoActivar)

export default router
