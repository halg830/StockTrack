import { Router } from "express";
import httpDistribucionLoteFicha from "../controllers/distribucionLoteFicha.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersPresupuesto from "../helpers/presupuesto.js";
import { validarRolAdmin } from "../middlewares/validar-rol.js";

const router = new Router();

router.get("/all", [validarJWT], httpDistribucionLoteFicha.getAll);

router.get(
  "/buscarId/:id",
  [
    validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    validarCampos,
  ],
  httpDistribucionLoteFicha.getPorId
);

router.post(
  "/agregar",
  [
    validarJWT,
    validarRolAdmin,
    check("presupuesto", "Digite el presupuesto").not().isEmpty(),
    check(
      "idDistribucionPresupuesto",
      "Digite el id de la distribución del presupuesto"
    )
      .not()
      .isEmpty(),
    check(
      "idDistribucionPresupuesto",
      "Digite el id de la distribución del presupuesto"
    ).isMongoId(),
    check("idFicha", "Digite el id de la ficha").not().isEmpty(),
    check("idFicha", "Digite el id de la ficha").isMongoId(),
    check("idDistribucionPresupuesto", "Presupuesto no valido").custom(
      helpersPresupuesto.obtenerDistribucionPresupuestoPorId
    ),
    validarCampos,
  ],
  httpDistribucionLoteFicha.post
);

router.put(
  "/editar/:id",
  [
    validarJWT,
    validarRolAdmin,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    check("presupuesto", "Digite el presupuesto").not().isEmpty(),
    check(
      "idDistribucionPresupuesto",
      "Digite el id de la distribución del presupuesto"
    )
      .not()
      .isEmpty(),
    check(
      "idDistribucionPresupuesto",
      "Digite el id de la distribución del presupuesto"
    ).isMongoId(),
    check("idFicha", "Digite el id de la ficha").not().isEmpty(),
    check("idFicha", "Digite el id de la ficha").isMongoId(),
    validarCampos,
  ],
  httpDistribucionLoteFicha.putEditar
);

router.put(
  "/inactivar/:id",
  [
    validarJWT,
    validarRolAdmin,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    validarCampos,
  ],
  httpDistribucionLoteFicha.putInactivar
);
router.put(
  "/activar/:id",
  [
    validarJWT,
    validarRolAdmin,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    validarCampos,
  ],
  httpDistribucionLoteFicha.putActivar
);

export default router;
