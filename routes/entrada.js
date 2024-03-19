import { Router } from "express";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import httpEntrada from "../controllers/entrada.js";
import { validarRolAdmin } from "../middlewares/validar-rol.js";
/* import helpersEntrada from "../helpers/entrada.js"; */

const router = new Router();

router.get("/all", validarJWT, httpEntrada.getAll);

router.get(
  "/buscarId/:id",
  [
    validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "El id es invalido").isMongoId(),
  ],
  httpEntrada.getPorId
);

router.post(
  "/agregar",
  [
    validarJWT,
    validarRolAdmin,
    check("cantidad", "Digite cantidad").not().isEmpty(),
/*     check("cantidad", "").custom(
      helpersEntrada.validarEntradaUnica
    ), */
    check("idProducto", "Por favor digite un producto existente").isMongoId(),
    check("total", "Por favor digite un total").not().isEmpty(),
    validarCampos,
  ],
  httpEntrada.post
);

router.put(
  "/editar/:id",
  [
    validarJWT,
    validarRolAdmin,
    check("id", "Digite el ID").not().isEmpty(),
    check("cantidad", "Digite cantidad").not().isEmpty(),
    /*     check("cantidad", "").custom(
          helpersEntrada.validarEntradaUnica
        ), */
        check("idProducto", "Por favor digite un producto existente").isMongoId(),
        check("total", "Por favor digite un total").not().isEmpty(),
    validarCampos,
  ],
  httpEntrada.putEditar
);

router.put(
  "/inactivar/:id",
  [
    validarJWT,
    validarRolAdmin,
    check("id", "No exite ID en la petición").not().isEmpty(),
    check("id", "No es Mongo ID").isMongoId(),
    validarCampos,
  ],
  httpEntrada.putInactivar
);

router.put(
  "/activar/:id",
  [
    validarJWT,
    validarRolAdmin,
    check("id", "No exite ID en la petición").not().isEmpty(),
    check("id", "No es Mongo ID").isMongoId(),
    validarCampos,
  ],
  httpEntrada.putActivar
);

export default router;
