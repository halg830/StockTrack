import { Router } from "express"
import httpPersona from "../controllers/login(Temporal).js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";

const router=new Router()

router.post("/login", httpPersona.login)

export default router
