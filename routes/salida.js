import { Router } from "express";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";
import httpSalida from "../controllers/salida.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersUsuario from "../helpers/usuario.js";
import helpersDestino from "../helpers/destino.js";

const router = new Router();

router.get("/all", validarJWT, httpSalida.getAll);

router.get(
  "/buscarId/:id",
  [
    validarJWT,
    check("id", "Digite el ID").not().isEmpty(),
    check("id", "No es un Mongo ID válido").isMongoId(),
    validarCampos,
  ],
  httpSalida.getPorId
);

router.get('/obtener-numero', validarJWT, httpSalida.getNumero)

router.post(
  "/agregar",
  [
    validarJWT,
    check("idBodeguero", "Digite el ID del bodeguero")
      .not()
      .isEmpty(),
    check("idBodeguero", "No es un Mongo ID válido").isMongoId(),
    check("idBodeguero").custom(helpersUsuario.existeHolderById),
    check("idPedido", "Digite la ficha").not().isEmpty(),
    check("idPedido", "No es un Mongo ID válido").isMongoId(),
    check("idPedido").custom(helpersDestino.existeId),
    validarCampos,
  ],
  httpSalida.post
);

router.put(
  "/editar/:id",
  [
    validarJWT,
    check("id", "Digite el ID").not().isEmpty(),
    check("id", "No es un Mongo ID válido").isMongoId(),
    check("idBodeguero", "Digite el ID del bodeguero")
      .not()
      .isEmpty(),
    check("idBodeguero", "No es un Mongo ID válido").isMongoId(),
    check("idBodeguero").custom(helpersUsuario.existeHolderById),
    check("idPedido", "Digite la ficha").not().isEmpty(),
    check("idPedido", "No es un Mongo ID válido").isMongoId(),
    check("idPedido").custom(helpersDestino.existeId),
    validarCampos,
  ],
  httpSalida.putEditar
);

export default router;
