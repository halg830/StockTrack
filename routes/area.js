import { Router } from "express";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import httpArea from "../controllers/area.js";
import { validarRolAdmin } from "../middlewares/validar-rol.js";

const router = new Router();

router.get("/all", validarJWT, httpArea.getAll);

router.get("/buscarId/:id",[
  validarJWT,
  check("id", "Digite el id").not().isEmpty(),
  check("id", "El id es invalido").isMongoId()
],httpArea.getPorId);

router.post("/agregar", [
  validarJWT,
  validarRolAdmin,
  check("nombre", "Digite el nombre del área").not().isEmpty(),
  validarCampos
], httpArea.post
);

router.put("/editar/:id",[
  validarJWT,
  validarRolAdmin,
  check("nombre", "Digite el nombre del área").not().isEmpty(),
  validarCampos,
],httpArea.putEditar
);


export default router;
