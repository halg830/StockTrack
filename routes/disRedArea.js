import { Router } from "express";
import httpDisRedArea from "../controllers/disRedArea.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersPresupuesto from "../helpers/presupuesto.js";
import { validarRolAdmin } from "../middlewares/validar-rol.js";
import helpersDisRedArea from "../helpers/disRedArea.js";

const router = new Router();

router.get("/all", [validarJWT], httpDisRedArea.getAll);

router.get(
  "/buscarId/:id",
  [
    validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    validarCampos,
  ],
  httpDisRedArea.getPorId
);

router.get('/distribucion/:idDistribucionPresupuesto',[
  validarJWT,
  validarRolAdmin,
  check('idDisDependenciaRed','Campo Vacio').not().isEmpty(),
  check('idDisDependenciaRed','Valor no Valido').isMongoId(),
  validarCampos
],httpDisRedArea.getByIdDistribucion)

router.post(
  "/agregar",
  [
    validarJWT,
    validarRolAdmin,
    check("presupuesto", "Digite el presupuesto").not().isEmpty(),
    check("presupuesto", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto), 
    check("idDisDependenciaRed", "Campo Distribucion Vacio").not().isEmpty(),
    check("idDisDependenciaRed","Valor no valido").isMongoId(),
    check("idDisDependenciaRed", "Ya existe").custom(helpersDisRedArea.existeDistribucion),
    check("idAreaTematica", "Campo Ficha Vacio").not().isEmpty(),
    check("idAreaTematica", "Valor no Valido").isMongoId(),
    validarCampos,
  ],
  httpDisRedArea.post
);


// router.put('/ajustarPresupuesto/:id',[
//   validarJWT,
//   validarRolAdmin,
//   check("id", "Digite el id").not().isEmpty(),
//   check("id", "No es mongo ID").isMongoId(),
//   check("presupuesto","No hay ningun presupuesto").not().isEmpty(),
//   validarCampos,
// ], httpDisDependenciaRed.putAjustarPresupuesto)

router.put(
  "/editar/:id",
  [
    validarJWT,
    validarRolAdmin,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    check("presupuesto", "Digite el presupuesto").not().isEmpty(),
    check("presupuesto", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto), 
    check("idDisDependenciaRed", "Campo Distribucion Vacio").not().isEmpty(),
    check("idDisDependenciaRed","Valor no valido").isMongoId(),
    check("idDisDependenciaRed", "Ya existe").custom(helpersDisRedArea.existeDistribucion),
    check("idAreaTematica", "Campo Ficha Vacio").not().isEmpty(),
    check("idAreaTematica", "Valor no Valido").isMongoId(),
    validarCampos,
  ],
  httpDisRedArea.putEditar
);

router.put(
  "/inactivar/:id",
  [
    validarJWT,
    validarRolAdmin,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    validarCampos,
  ],
  httpDisRedArea.putInactivar
);
router.put(
  "/activar/:id",
  [
    validarJWT,
    validarRolAdmin,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    validarCampos,
  ],
  httpDisRedArea.putActivar
);

export default router;
