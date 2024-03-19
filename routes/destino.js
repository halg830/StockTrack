import { Router } from "express"
import httpDestino from "../controllers/destino.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersDestino from "../helpers/destino.js";

const router=new Router()

router.get('/all',[
    validarJWT
],httpDestino.getAll)

router.get('/buscarId/:id',[
    validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    validarCampos
],httpDestino.getPorId)

router.get('/buscarEstado/:estado',[
    validarJWT,
    check('estado',"Digite el estado").not().isEmpty(),
],httpDestino.getEstado)

router.post('/agregar', [
    validarJWT,
    check('codigo',"Digite el codigo de la destino").not().isEmpty(),
    check('codigo',"Ya existe una destino con este codigo").custom(helpersDestino.validarFichaUnica),
    check('nombre',"Digite el nombre de la destino").not().isEmpty(),
    check('nivelFormacion', "Digite el nivel de formacion").not().isEmpty(),
    check('fechaInicio', "Digite la fecha de Inicio").not().isEmpty(),
    check('fechaInicio',"Fecha Invalida").custom(helpersDestino.validarFechas),
    check('fechaFin', "Digite la fecha de fin").not().isEmpty(),
    check('idArea',"Digite el ID del área").not().isEmpty(),
    check('idArea',"No es Mongo ID").isMongoId(),
    validarCampos
],httpDestino.post)

router.put('/editar/:id',[
    validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    check('codigo',"Digite el codigo de la destino").not().isEmpty(),
    check('codigo',"Ya existe una destino con este codigo").custom((value, { req }) => {
        const { id } = req.params;
        return helpersDestino.validarFichaUnicaEditar(id, value);
    }),
    check('nombre',"Digite el nombre de la destino").not().isEmpty(),
    check('nivelFormacion', "Digite el nivel de formacion").not().isEmpty(),
    check('fechaInicio', "Digite la fecha de Inicio").not().isEmpty(),
    check('fechaFin', "Digite la fecha de fin").not().isEmpty(),
    check('idArea',"Digite el ID del área").not().isEmpty(),
    check('idArea',"No es Mongo ID").isMongoId(),
    validarCampos
],httpDestino.putEditar)

router.put('/inactivar/:id', [
    validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    validarCampos
],httpDestino.putInactivar)

router.put('/activar/:id', [
    validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    validarCampos
],httpDestino.putActivar)

export default router
