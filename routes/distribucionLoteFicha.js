import { Router } from "express"
import httpDistribucionLoteFicha from "../controllers/distribucionloteficha.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersPresupuesto from "../helpers/presupuesto.js";

const router=new Router()

router.get('/obtenerAsignaciones',[
    validarJWT
],httpDistribucionLoteFicha.getAsignaciones)

router.get('/obtenerAsignacionId/:id',[
    validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    validarCampos
],httpDistribucionLoteFicha.getAsignacionById)

router.post('/agregar',[
    check("presupuesto", "Digite el presupuesto").not().isEmpty(),
    check("idDistribucionPresupuesto", "Digite el id de la distribución del presupuesto").not().isEmpty(),
    check("idDistribucionPresupuesto", "Digite el id de la distribución del presupuesto").isMongoId(),
    check("idFicha", "Digite el id de la ficha").not().isEmpty(),
    check("idFicha", "Digite el id de la ficha").isMongoId(),
    check("idDistribucionPresupuesto", "Presupuesto no valido").custom(helpersPresupuesto.obtenerDistribucionPresupuestoPorId),
    validarCampos
],httpDistribucionLoteFicha.postAsignacion)

router.put('/editarAsignacion',[
    validarJWT,
    check("presupuesto", "Digite el presupuesto").not().isEmpty(),
    check("idDistribucionPresupuesto", "Digite el id de la distribución del presupuesto").not().isEmpty(),
    check("idDistribucionPresupuesto", "Digite el id de la distribución del presupuesto").isMongoId(),
    check("idFicha", "Digite el id de la ficha").not().isEmpty(),
    check("idFicha", "Digite el id de la ficha").isMongoId(),
    validarCampos
],httpDistribucionLoteFicha.putEditarAsignacion)

router.delete('/eliminarAsignacion/:id',[
    validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    validarCampos
],httpDistribucionLoteFicha.deleteAsignacion)

router.put('/inactivarAsignacion/:id', [
    validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    validarCampos
],httpDistribucionLoteFicha.putAsignacionInactivar)


export default router   
