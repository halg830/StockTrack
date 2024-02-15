import { Router } from "express";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import httpArea from "../controllers/area.js";
import { validarRolAdmin } from "../middlewares/validar-rol.js";
import helpersArea from "../helpers/area.js";

const router = new Router();

router.get("/all", validarJWT, httpArea.getAll);

router.get(
  "/buscarId/:id",
  [
    validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "El id es invalido").isMongoId(),
  ],
  httpArea.getPorId
);

router.post(
  "/agregar",
  [
    validarJWT,
    validarRolAdmin,
    check("nombre", "Digite el nombre del área").not().isEmpty(),
    check("nombre", "Nombre ya registrado").custom(
      helpersArea.validarAreaUnica
    ),
    validarCampos,
  ],
  httpArea.post
);

router.put(
  "/editar/:id",
  [
    validarJWT,
    validarRolAdmin,
    check("nombre", "Digite el nombre del área").not().isEmpty(),
    check("nombre", "Nombre ya registrado").custom((value, { req }) => {
      const { id } = req.params;
      return helpersArea.validarAreaUnicaEditar(id, value);
    }),
    validarCampos,
  ],
  httpArea.putEditar
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
  httpArea.putInactivar
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
  httpArea.putActivar
);

export default router;
