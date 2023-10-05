import { Router } from "express";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";
import { crearPedido, obtenerPedidos, obtenerPedidoPorId, actualizarPedido, eliminarPedido } from "../controllers/pedidoController.js";

const router = new Router();

router.post("/pedidos", [
    check('fechaCreacion', "Digite la fecha de creación").not().isEmpty(),
    check('fechaEntrega', "Digite la fecha de entrega").not().isEmpty(),
    check('idDistribucionLoteFicha', "Digite el ID de DistribucionLoteFicha").not().isEmpty(),
    check('idDistribucionLoteFicha', "No es un Mongo ID válido").isMongoId(),
    check('idInstructorEncargado', "Digite el ID de InstructorEncargado").not().isEmpty(),
    check('idInstructorEncargado', "No es un Mongo ID válido").isMongoId(),
    check('subtotal', "Digite el subtotal").not().isEmpty(),
    check('estado', "Digite el estado").not().isEmpty(),
], validarCampos, crearPedido);

router.get("/pedidos", obtenerPedidos);

router.get("/pedidos/:id", [
    check("id", "Digite el ID").not().isEmpty(),
    check("id", "No es un Mongo ID válido").isMongoId(),
], validarCampos, obtenerPedidoPorId);

router.put("/pedidos/:id", [
    check("id", "Digite el ID").not().isEmpty(),
    check("id", "No es un Mongo ID válido").isMongoId(),
    check('fechaCreacion', "Digite la fecha de creación").not().isEmpty(),
    check('fechaEntrega', "Digite la fecha de entrega").not().isEmpty(),
    check('idDistribucionLoteFicha', "Digite el ID de DistribucionLoteFicha").not().isEmpty(),
    check('idDistribucionLoteFicha', "No es un Mongo ID válido").isMongoId(),
    check('idInstructorEncargado', "Digite el ID de InstructorEncargado").not().isEmpty(),
    check('idInstructorEncargado', "No es un Mongo ID válido").isMongoId(),
    check('subtotal', "Digite el subtotal").not().isEmpty(),
    check('estado', "Digite el estado").not().isEmpty(),
], validarCampos, actualizarPedido);

router.delete("/pedidos/:id", [
    check("id", "Digite el ID").not().isEmpty(),
    check("id", "No es un Mongo ID válido").isMongoId(),
], validarCampos, eliminarPedido);

export default router;
