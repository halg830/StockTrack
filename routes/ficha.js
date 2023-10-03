import { Router } from "express"
import httpFicha from "../controllers/ficha.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";

const router=new Router()

router.get('/obtenerFichas',httpFicha.getObtenerFichas)
router.get('/obtenerFichasById',[
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    validarCampos
])

export default router
