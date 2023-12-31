import { Router } from "express";
import httpProducto from "../controllers/producto.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersProducto from '../helpers/producto.js'

const router = new Router();

router.get("/all", [validarJWT], httpProducto.getAll);

router.get(
  "/getPorFechas",
  [
    validarJWT,
    check("fechaInicio", "Ingrese una fecha de inicio válida").not().isEmpty(),
    check("fechaInicio", "Ingrese una fecha de inicio válida").isISO8601(),
    check("fechaFin", "Ingrese una fecha de fin válida").not().isEmpty(),
    check("fechaFin", "Ingrese una fecha de fin válida").isISO8601(),
    validarCampos,
  ],
  httpProducto.getPorFechas
);

router.post(
  "/agregar",
  [
    validarJWT,
    check("codigo", "Ingrese un codigo").not().isEmpty(),
    check("nombre", "Ingrese un nombre").not().isEmpty(),
    check("descripcion", "Ingrese una descripcion").not().isEmpty(),
    check("unidadMedida", "Ingrese la unidad de medida").not().isEmpty(),
    check("precioUnitario", "Ingrese un precio unitario").not().isEmpty(),
    check("precioUnitario", "El precio unitario debe ser mayor a 0").custom(helpersProducto.precioValido),
    check("tipoProducto", "Especifique el tipo de producto").not().isEmpty(),
    check("iva", "Ingrese el iva").not().isEmpty(),
    validarCampos,
  ],
  httpProducto.post
);

router.put(
  "/editar/:id",
  [
    validarJWT,
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
    check("codigo", "Ingrese un codigo").not().isEmpty(),
    check("nombre", "Ingrese un nombre").not().isEmpty(),
    check("descripcion", "Ingrese una descripcion").not().isEmpty(),
    check("unidadMedida", "Ingrese la unidad de medida").not().isEmpty(),
    check("precioUnitario", "Ingrese un precio unitario").not().isEmpty(),
    check("precioUnitario", "El precio unitario debe ser mayor a 0").isFloat({
      gt: 0,
    }),
    check("tipoProducto", "Especifique el tipo de producto").not().isEmpty(),
    check("iva", "Ingrese el iva").not().isEmpty(),
    validarCampos,
  ],
  httpProducto.putEditar
);

router.put(
  "/inactivar/:id",
  [
    validarJWT,
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
  ],
  httpProducto.putInactivar
);
router.put(
  "/activar/:id",
  [
    validarJWT,
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
  ],
  httpProducto.putActivar
);

export default router;
