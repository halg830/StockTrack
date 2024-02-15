import { Router } from "express"
import httpDetallePedido from "../controllers/detallePedido.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";

const router=new Router()

router.get('/all',[
    validarJWT
],httpDetallePedido.getAll)

router.get('/buscarId/:id',[
    validarJWT,
    check('id', "Digite el id").not().isEmpty(),
    check('id', "No es Mongo Id").isMongoId(),
    validarCampos
],httpDetallePedido.getPorId)

router.post('/agregar',[
    validarJWT,
    check('cantidad', "Digite la Cantidad").not().isEmpty(),
    check('idPedido', "Digite el id del pedido").not().isEmpty(),
    check('idPedido', "No es Mongo Id").isMongoId(),
    check('idPedido').custom(),
    check('idDistribucionLoteFicha', "Digite el ID de DistribucionLoteFicha").not().isEmpty(),
    check('idDistribucionLoteFicha', "No es un Mongo ID válido").isMongoId(),
    check('idDistribucionLoteFicha').custom(),
    validarCampos
],httpDetallePedido.post)

router.put('/editar/:id',[
    validarJWT,
    check('id', "Digite el id").not().isEmpty(),
    check('id', "No es Mongo Id").isMongoId(),
    check('cantidad', "Digite la Cantidad").not().isEmpty(),
    check('idDistribucionLoteFicha', "Digite el ID de DistribucionLoteFicha").not().isEmpty(),
    check('idDistribucionLoteFicha', "No es un Mongo ID válido").isMongoId(),
    validarCampos
],httpDetallePedido.putEditar)


router.put('/inactivar/:id',[
    validarJWT,
    check('id', "Digite el id").not().isEmpty(),
    check('id', "No es Mongo Id").isMongoId(),
    validarCampos
],httpDetallePedido.putInactivar)


router.put('/activar/:id',[
    validarJWT,
    check('id', "Digite el id").not().isEmpty(),
    check('id', "No es Mongo Id").isMongoId(),
    validarCampos
],httpDetallePedido.putActivar)

export default router
