import { Router } from "express";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";
import httpPedido from "../controllers/pedido.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = new Router();

router.get("/all", validarJWT, httpPedido.getAll);

router.get("/buscarId/:id", [
    validarJWT,
    check("id", "Digite el ID").not().isEmpty(),
    check("id", "No es un Mongo ID válido").isMongoId(),
    validarCampos
], httpPedido.getPorId);

router.post("/guardar", [
    validarJWT,
    check('fechaCreacion', "Digite la fecha de creación").not().isEmpty(),
    check('fechaEntrega', "Digite la fecha de entrega").not().isEmpty(),
    check('idDistribucionLoteFicha', "Digite el ID de DistribucionLoteFicha").not().isEmpty(),
    check('idDistribucionLoteFicha', "No es un Mongo ID válido").isMongoId(),
    check('idInstructorEncargado', "Digite el ID de InstructorEncargado").not().isEmpty(),
    check('idInstructorEncargado', "No es un Mongo ID válido").isMongoId(),
    check('subtotal', "Digite el subtotal").not().isEmpty(), 
    validarCampos,
], httpPedido.post);

router.put("/editar/:id", [
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
],  httpPedido.putEditar);

export default router;
