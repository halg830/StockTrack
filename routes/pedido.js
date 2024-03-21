import { Router } from "express";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";
import httpPedido from "../controllers/pedido.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersUsuario from "../helpers/usuario.js";
import helpersDestino from "../helpers/destino.js";

const router = new Router();

router.get("/all", validarJWT, httpPedido.getAll);

router.get(
  "/buscarId/:id",
  [
    validarJWT,
    check("id", "Digite el ID").not().isEmpty(),
    check("id", "No es un Mongo ID válido").isMongoId(),
    validarCampos,
  ],
  httpPedido.getPorId
);

router.get('/obtener-numero', validarJWT, httpPedido.getNumero)

router.post(
  "/agregar",
  [
    validarJWT,
    //check('fechaEntrega', "Digite la fecha de entrega").not().isEmpty(),
    check("idInstructorEncargado", "Digite el ID de InstructorEncargado")
      .not()
      .isEmpty(),
    check("idInstructorEncargado", "No es un Mongo ID válido").isMongoId(),
    check("idInstructorEncargado").custom(helpersUsuario.existeHolderById),
    check("idDestino", "Digite la Destino").not().isEmpty(),
    check("idDestino", "No es un Mongo ID válido").isMongoId(),
    check("idDestino").custom(helpersDestino.existeId),
    validarCampos,
  ],
  httpPedido.post
);

router.put(
  "/editar/:id",
  [
    validarJWT,
    check("id", "Digite el ID").not().isEmpty(),
    check("id", "No es un Mongo ID válido").isMongoId(),
    check("idInstructorEncargado", "Digite el ID de InstructorEncargado")
      .not()
      .isEmpty(),
    check("idInstructorEncargado", "No es un Mongo ID válido").isMongoId(),
    check("idInstructorEncargado").custom(helpersUsuario.existeHolderById),
    check("idDestino", "Digite la Destino").not().isEmpty(),
    check("idDestino", "No es un Mongo ID válido").isMongoId(),
    check("idDestino").custom(helpersDestino.existeId),
    validarCampos,
  ],
  httpPedido.putEditar
);

export default router;
