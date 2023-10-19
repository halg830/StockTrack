import { Router } from "express";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";
import { crearPedido, obtenerPedidos, obtenerPedidoPorId, actualizarPedido, eliminarPedido } from "../controllers/pedido.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = new Router();

router.post("/pedidos", [
    validarJWT,
    check('fechaCreacion', "Digite la fecha de creación").not().isEmpty(),
    check('fechaEntrega', "Digite la fecha de entrega").not().isEmpty(),
    check('idDistribucionLoteFicha', "Digite el ID de DistribucionLoteFicha").not().isEmpty(),
    check('idDistribucionLoteFicha', "No es un Mongo ID válido").isMongoId(),
    check('idInstructorEncargado', "Digite el ID de InstructorEncargado").not().isEmpty(),
    check('idInstructorEncargado', "No es un Mongo ID válido").isMongoId(),
    check('subtotal', "Digite el subtotal").not().isEmpty(), 
    validarCampos,
], crearPedido);

router.get("/pedidos", validarJWT, obtenerPedidos);

router.get("/pedidos/:id", [
    validarJWT,
    check("id", "Digite el ID").not().isEmpty(),
    check("id", "No es un Mongo ID válido").isMongoId(),
    validarCampos
], obtenerPedidoPorId);

router.put("/pedidos/:id", [
    validarJWT,
    check("id", "Digite el ID").not().isEmpty(),
    check("id", "No es un Mongo ID válido").isMongoId(),
    check('fechaCreacion', "Digite la fecha de creación").not().isEmpty(),
    check('fechaEntrega', "Digite la fecha de entrega").not().isEmpty(),
    check('idDistribucionLoteFicha', "Digite el ID de DistribucionLoteFicha").not().isEmpty(),
    check('idDistribucionLoteFicha', "No es un Mongo ID válido").isMongoId(),
    check('idInstructorEncargado', "Digite el ID de InstructorEncargado").not().isEmpty(),
    check('idInstructorEncargado', "No es un Mongo ID válido").isMongoId(),
    check('subtotal', "Digite el subtotal").not().isEmpty(),
    validarCampos,
],  actualizarPedido);

router.delete("/pedidos/:id", [
    validarJWT,
    check("id", "Digite el ID").not().isEmpty(),
    check("id", "No es un Mongo ID válido").isMongoId(),
    validarCampos,
],  eliminarPedido);

export default router;
