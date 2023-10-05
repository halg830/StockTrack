import { Router } from "express";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import * as areaController from "../controllers/area.js"; // Importa el controlador de "area"

const router = new Router();

router.get("/todos", validarJWT, areaController.obtenerAreas);

router.get("/areas/:id", validarJWT, areaController.obtenerAreaPorId);

router.post(
  "/crear",
  [
    check("Nombre", "Digite el nombre del área").not().isEmpty(),
    validarCampos,
  ],
  validarJWT,
  areaController.crearArea
);

router.put(
  "/areas/:id",
  [
    check("Nombre", "Digite el nombre del área").not().isEmpty(),
    validarCampos,
  ],
  validarJWT,
  areaController.actualizarArea
);

router.delete("/areas/:id", validarJWT, areaController.eliminarArea);

router.get("/areas/buscar", validarJWT, areaController.buscarPorNombre);

router.get("/areas/:id/fichas", validarJWT, areaController.verFichas);

export default router;
