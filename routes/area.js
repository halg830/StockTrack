import { Router } from "express";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import httpArea from "../controllers/area.js";

const router = new Router();

router.get("/todos", validarJWT, httpArea.obtenerAreas);

router.get("/areas/:id",[
  validarJWT,
  check("id", "Digite el id").not().isEmpty(),
  check("id", "El id es invalido").isMongoId()
],httpArea.obtenerAreaPorId);

router.post("/agregar", [
  validarJWT,
  check("nombre", "Digite el nombre del área").not().isEmpty(),
  validarCampos
], httpArea.crearArea
);

router.put("/areas/:id",[
  validarJWT,
  check("nombre", "Digite el nombre del área").not().isEmpty(),
  validarCampos,
],httpArea.actualizarArea
);


export default router;
