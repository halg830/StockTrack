import { Router } from "express";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import httpConexRedLote from "../controllers/conexionRedLote.js";
import helpersConexionRedLote from "../helpers/conexionRedLote.js";
import helpersRedConocimiento from "../helpers/redConocimiento.js";
import helpersLote from "../helpers/lote.js";

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

router.get("/buscarPorLote/:idLote",
  [
    validarJWT,
    check("idLote", "Digite el id del lote").not().isEmpty(),
    check("idLote", "El id es invalido").isMongoId(),
  ], 
  validarCampos,
  httpConexRedLote.getPorLote
);

router.get("/buscarPorRed/:idRed",
  [
    validarJWT,
    check("idRed", "Digite el id de la red de conocimiento").not().isEmpty(),
    check("idRed", "El id es invalido").isMongoId(),
  ], 
  validarCampos,
  httpConexRedLote.getPorRed
);


router.post(
  "/agregar",
  [
    validarJWT,
    check("codigo",).custom(helpersConexionRedLote.existeCodigo),
    check("idRed", "Seleccione una red").not().isEmpty(),
    check("idRed", "El id es invalido").isMongoId(),
    check('idRed').custom(helpersRedConocimiento.existeId),
    check("idLote", "Seleccione un lote").not().isEmpty(),
    check("idLote", "El id es invalido").isMongoId(),
    check('idLote').custom(helpersLote.existeId),
    check("idLote").custom(helpersConexionRedLote.existeConexion),
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
    check("codigo",).custom(helpersConexionRedLote.existeCodigo),
    check("idRed", "Seleccione una red").not().isEmpty(),
    check("idRed", "El id es invalido").isMongoId(),
    check("idRed", "Red no valida").custom(helpersConexionRedLote.existeRed),
    check("idLote", "Seleccione un lote").not().isEmpty(),
    check("idLote", "El id es invalido").isMongoId(),
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