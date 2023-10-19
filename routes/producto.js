import { Router } from "express"
import httpProducto from "../controllers/producto.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";

const router=new Router()

router.get('/obtenerProductos',[
    validarJWT
],httpProducto.getObtenerProducto)

router.get('/obtenerPorFechas', [
    validarJWT,
    check("fechaInicio", "Ingrese una fecha de inicio válida").not().isEmpty(),
    check("fechaInicio", "Ingrese una fecha de inicio válida").isISO8601(),
    check("fechaFin", "Ingrese una fecha de fin válida").not().isEmpty(),
    check("fechaFin", "Ingrese una fecha de fin válida").isISO8601(),
    validarCampos
], httpProducto.getObtenerProductoPorFechas);

router.post('/agregar',[
    validarJWT,
    check("codigo", "Ingrese un codigo").not().isEmpty(),
    check("nombre", "Ingrese un nombre").not().isEmpty(),
    check("descripcion", "Ingrese una descripcion").not().isEmpty(),
    check("unidadMedida", "Ingrese la unidad de medida").not().isEmpty(),
    check("precioUnitario", "Ingrese un precio unitario").not().isEmpty(),
    check("precioUnitario", "El precio unitario debe ser mayor a 0").custom(),
    check("tipoProducto", "Especifique el tipo de producto").not().isEmpty(),
    check("iva", "Ingrese el iva").not().isEmpty(),
    validarCampos
],httpProducto.postAgregarProducto)

router.put('/editar/:id', [
    validarJWT,
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
    check("codigo", "Ingrese un codigo").not().isEmpty(),
    check("nombre", "Ingrese un nombre").not().isEmpty(),
    check("descripcion", "Ingrese una descripcion").not().isEmpty(),
    check("unidadMedida", "Ingrese la unidad de medida").not().isEmpty(),
    check("precioUnitario", "Ingrese un precio unitario").not().isEmpty(),
    check("precioUnitario", "El precio unitario debe ser mayor a 0").isFloat({ gt: 0 }),
    check("tipoProducto", "Especifique el tipo de producto").not().isEmpty(),
    check("iva", "Ingrese el iva").not().isEmpty(),
    validarCampos
], httpProducto.putEditarProducto);

router.put('/inactivar-activar/:id', [
    validarJWT,
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId()
], httpProducto.putProductoInactivar);

export default router