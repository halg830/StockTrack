import { Router } from "express"
import httpDetallePedido from "../controllers/detallePedido.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";

const router=new Router()


export default router
