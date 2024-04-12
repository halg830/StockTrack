import { Router } from "express";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";
import httpSalida from "../controllers/salida.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersUsuario from "../helpers/usuario.js";
import helpersPedido from "../helpers/pedido.js";

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

router.get("/obtener-numero", validarJWT, httpSalida.getNumero);

router.post(
  "/agregar",
  [
    validarJWT,
    check("idAdmin", "Digite el ID del Admin").not().isEmpty(),
    check("idAdmin", "No es un Mongo ID válido").isMongoId(),
    check("idAdmin").custom(helpersUsuario.existeHolderById),
    check("idPedido", "Digite la ficha").not().isEmpty(),
    check("idPedido", "No es un Mongo ID válido").isMongoId(),
    check("idPedido").custom(helpersPedido.existeId),
    check('detSalidas', 'Ingrese el detalle de salida').not().isEmpty(),
    check('detPedido', 'Ingrese el detalle de pedido').not().isEmpty(),
    validarCampos,
  ],
  httpSalida.post
);

router.put(
  "/entregado/:id",
  [
    validarJWT,
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
  ],
  httpSalida.putEntregado
);
router.put(
  "/noEntregado/:id",
  [
    validarJWT,
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
  ],
  httpSalida.putNoEntregado
);

export default router;
