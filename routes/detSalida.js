import { Router } from "express";
import httpDetSalida from "../controllers/detSalida.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersDetSalida from "../helpers/detSalida.js";
import helpersSalida from "../helpers/salida.js";
import helpersProducto from "../helpers/producto.js";

const router = new Router();

router.get("/all", [validarJWT], httpDetSalida.getAll);

router.get(
  "/buscarId/:id",
  [
    validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es Mongo Id").isMongoId(),
    check("id").custom(helpersDetSalida.existeId),
    validarCampos,
  ],
  httpDetSalida.getPorId
);

router.get(
  "/getPorSalida/:idSalida",
  [
    validarJWT,
    check("idSalida", "Ingrese el salida").not().isEmpty(),
    check("idSalida", "Id de salida no válida").isMongoId(),
    check("idSalida").custom(helpersSalida.existeId),
    validarCampos,
  ],
  httpDetSalida.getBySalida
);


router.post(
  "/agregar",
  [
    validarJWT,
    check("cantidad", "Digite la Cantidad").not().isEmpty(),
    check("cantidad", "Tipo de dato no válido para cantidad").isNumeric(),
    check("idSalida", "Digite el id del salida").not().isEmpty(),
    check("idSalida", "No es Mongo Id").isMongoId(),
    check("idSalida").custom(helpersSalida.existeId),
    check("idProducto", "Digite un producto").not().isEmpty(),
    check("idProducto", "Producto no válido").isMongoId(),
    check("idProducto").custom(helpersProducto.existeId),
    validarCampos,
  ],
  httpDetSalida.post
);

router.put(
  "/editar/:id",
  [
    validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es Mongo Id").isMongoId(),
    check("id").custom(helpersDetSalida.existeId),
    check("cantidad", "Digite la Cantidad").not().isEmpty(),
    check("cantidad", "Tipo de dato no válido para cantidad").isNumeric(),
    check("idSalida", "Digite el id del salida").not().isEmpty(),
    check("idSalida", "No es Mongo Id").isMongoId(),
    check("idSalida").custom(helpersSalida.existeId),
    check("idProducto", "Digite un producto").not().isEmpty(),
    check("idProducto", "Producto no válido").isMongoId(),
    check("idProducto").custom(helpersProducto.existeId),
    validarCampos,
  ],
  httpDetSalida.putEditar
);

router.put(
  "/inactivar/:id",
  [
    validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es Mongo Id").isMongoId(),
    check("id").custom(helpersDetSalida.existeId),
    validarCampos,
  ],
  httpDetSalida.putInactivar
);

router.put(
  "/activar/:id",
  [
    validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es Mongo Id").isMongoId(),
    check("id").custom(helpersDetSalida.existeId),
    validarCampos,
  ],
  httpDetSalida.putActivar
);

export default router;
