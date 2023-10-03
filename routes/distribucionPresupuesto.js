import { Router } from "express"
import httpDistribucionPresupuesto from "../controllers/distribucionPresupuesto.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";

const router=new Router()

router.post('/agregar',[
    check("presupuesto", "Ingrese un presupuesto").not().isEmpty(),
    check("idLote", "Asigne un lote").not().isEmpty(),
    check("idLote", "No es un id válido").isMongoId(),
    check("idItem", "Asigne un item").not().isEmpty(),
    check("idItem", "No es un id válido").isMongoId(),
    validarCampos
],httpDistribucionPresupuesto.agregarDistribucion)

export default router
