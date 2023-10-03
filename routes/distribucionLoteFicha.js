import { Router } from "express"
import httpDistribucionLoteFicha from "../controllers/distribucionloteficha.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";

const router=new Router()


router.post('/asignacion',[
    check("presupuesto", "Digite el presupuesto").not().isEmpty(),
    check("id_distribucion_presupuesto", "Digite el id de la distribución del presupuesto").isMongoId(),
    check("id_ficha", "Digite el id de la ficha").isMongoId(),
    validarCampos
],httpDistribucionLoteFicha.asignacionPresupuesto)



export default router   
