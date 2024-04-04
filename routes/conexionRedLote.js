import { Router } from "express";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import httpConexRedLote from "../controllers/conexionRedLote.js";

const router = new Router();


router.get("/all", validarJWT, httpConexRedLote.getTodo);


router.get(
  "/buscarId/:id",
  [
    validarJWT,
    check("id", "Digite el id de la conexión").not().isEmpty(),
    check("id", "El id es invalido").isMongoId(),
  ],
  validarCampos,
  httpConexRedLote.getConexionById
);


router.post(
  "/agregar",
  [
    validarJWT,
    check("idRed", "Seleccione una red").not().isEmpty(),
    check("idLote", "Seleccione un lote").not().isEmpty(),
  ],
  validarCampos,
  httpConexRedLote.postAgregar
);


router.put(
  "/editar/:id",
  [
    validarJWT,
    check("id", "Digite el id de la conexión").not().isEmpty(),
    check("id", "El id es invalido").isMongoId(),
    check("idRed", "Seleccione una red").not().isEmpty(),
    check("idLote", "Seleccione un lote").not().isEmpty(),
  ],
  validarCampos,
  httpConexRedLote.putEditar
);


router.put(
  "/inactivar/:id",
  [validarJWT, check("id", "Digite el id de la conexión").not().isEmpty(), check("id", "El id es invalido").isMongoId()],
  validarCampos,
  httpConexRedLote.putInactivar
);


router.put(
  "/activar/:id",
  [validarJWT, check("id", "Digite el id de la conexión").not().isEmpty(), check("id", "El id es invalido").isMongoId()],
  validarCampos,
  httpConexRedLote.putActivar
);

export default router;