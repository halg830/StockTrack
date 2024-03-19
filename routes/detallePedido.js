import { Router } from "express";
import httpDetallePedido from "../controllers/detallePedido.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersDetPedido from "../helpers/detPedido.js";
import helpersPedido from "../helpers/pedido.js";


const router = new Router();

router.get("/all", [validarJWT], httpDetallePedido.getAll);

router.get(
  "/buscarId/:id",
  [
    validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es Mongo Id").isMongoId(),
    check("id").custom(helpersDetPedido.existeId),
    validarCampos,
  ],
  httpDetallePedido.getPorId
);

router.get("/getPorPedido/:idPedido", [
  validarJWT,
  check("idPedido", "Ingrese el pedido").not().isEmpty(),
  check("idPedido", "Id de pedido no válida").isMongoId(),
  check("idPedido").custom(helpersPedido.existeId),
  validarCampos,
], httpDetallePedido.getByPedido);

router.post(
  "/agregar",
  [
    validarJWT,
    check("cantidad", "Digite la Cantidad").not().isEmpty(),
    check("cantidad", "Tipo de dato no válido para cantidad").isNumeric(),
    check("idPedido", "Digite el id del pedido").not().isEmpty(),
    check("idPedido", "No es Mongo Id").isMongoId(),
    check("idPedido").custom(helpersPedido.existeId),
    validarCampos,
  ],
  httpDetallePedido.post
);

router.put(
  "/editar/:id",
  [
    validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es Mongo Id").isMongoId(),
    check("idPedido").custom(helpersDetPedido.existeId),
    check("cantidad", "Digite la Cantidad").not().isEmpty(),
    check("cantidad", "Tipo de dato no válido para cantidad").isNumeric(),
    validarCampos,
  ],
  httpDetallePedido.putEditar
);

router.put(
  "/inactivar/:id",
  [
    validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es Mongo Id").isMongoId(),
    check('id').custom(helpersDetPedido.existeId),
    validarCampos,
  ],
  httpDetallePedido.putInactivar
);

router.put(
  "/activar/:id",
  [
    validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es Mongo Id").isMongoId(),
    check('id').custom(helpersDetPedido.existeId),
    validarCampos,
  ],
  httpDetallePedido.putActivar
);

export default router;
