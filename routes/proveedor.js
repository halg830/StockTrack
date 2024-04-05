import { Router } from "express";
import httpProveedor from "../controllers/proveedor.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersProveedor from "../helpers/proveedor.js";

const router = new Router();

//Get
router.get("/all", [validarJWT], httpProveedor.getAll);

//Post
router.post(
  "/registro",
  [
    validarJWT,
    check("nombre", "Digite el nombre").not().isEmpty(),
    check("apellido", "Digite el apellido").not().isEmpty(),
    check("identificacion", "Digite la identificacion").not().isEmpty(),
    check("identificacion").custom(helpersProveedor.existeIdentificacion),
    check("correo", "Digite el correo").not().isEmpty(),
    check("correo", "Digite el correo").isEmail(),
    check("correo").custom(helpersProveedor.existeCorreo),
    check("telefono", "Digite el telefono").not().isEmpty(),
    check("telefono").custom(helpersProveedor.existeTelefono),
    check("empresa", "Ingrese la empresa").not().isEmpty(),
    validarCampos,
  ],
  httpProveedor.registroProveedor
);

router.put(
  "/editar/:id",
  [
    validarJWT,
    check("id", "Ingrese una id").not().isEmpty(),
    check("id", "Id no válida").isMongoId(),
    check("id").custom(helpersProveedor.existeId),
    check("nombre", "Digite el nombre").not().isEmpty(),
    check("apellido", "Digite el apellido").not().isEmpty(),
    check("identificacion", "Digite la identificacion").not().isEmpty(),
    check("identificacion").custom(helpersProveedor.existeIdentificacion),
    check("correo", "Digite el correo").not().isEmpty(),
    check("correo", "Digite el correo").isEmail(),
    check("correo").custom(helpersProveedor.existeCorreo),
    check("telefono", "Digite el telefono").not().isEmpty(),
    check("telefono").custom(helpersProveedor.existeTelefono),
    check("empresa", "Ingrese la empresa").not().isEmpty(),
    validarCampos,
  ],
  httpProveedor.editarProveedor
);

router.put(
  "/inactivar/:id",
  [
    validarJWT,
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
    check("id").custom(helpersProveedor.existeId),
    validarCampos,
  ],
  httpProveedor.putInactivar
);
router.put(
  "/activar/:id",
  [
    validarJWT,
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
    check("id").custom(helpersProveedor.existeId),
    validarCampos,
  ],
  httpProveedor.putActivar
);

export default router;
