import { Router } from "express"
import httpPersona from "../controllers/persona.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";

const router=new Router()

router.post()

export default router
