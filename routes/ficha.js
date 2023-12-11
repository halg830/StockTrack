import { Router } from "express"
import httpFicha from "../controllers/ficha.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersFicha from "../helpers/ficha.js";

const router=new Router()

router.get('/all',[
    validarJWT
],httpFicha.getAll)

router.get('/buscarId/:id',[
    validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    validarCampos
],httpFicha.getPorId)

router.get('/buscarNumero/:numero',[
    validarJWT,
    check("numero","Digite el numero de la ficha").not().isEmpty(),
    validarCampos
],httpFicha.getPorNumero)

router.get('/buscarArea/:idArea',[
    validarJWT,
    check("idArea", "Digite el id").not().isEmpty(),
    check("idArea", "No es mongo ID").isMongoId(),
    validarCampos
],httpFicha.getPorArea)

router.get('/buscarEstado/:estado',[
    validarJWT,
    check('estado',"Digite el estado").not().isEmpty(),
],httpFicha.getEstado)

router.post('/agregar', [
    validarJWT,
    check('codigo',"Digite el codigo de la ficha").not().isEmpty(),
    check('nombre',"Digite el nombre de la ficha").not().isEmpty(),
    check('nivelFormacion', "Digite el nivel de formacion").not().isEmpty(),
    check('fechaInicio', "Digite la fecha de Inicio").not().isEmpty(),
    check('fechaInicio',"Fecha Invalida").custom(helpersFicha.validarFechas),
    check('fechaFin', "Digite la fecha de fin").not().isEmpty(),
    check('idArea', "Digite el id del area").not().isEmpty(),
    check('idArea', "No es Mongo Id").isMongoId(),
    validarCampos
],httpFicha.post)

router.put('/editar/:id',[
    validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    check('codigo',"Digite el codigo de la ficha").not().isEmpty(),
    check('nombre',"Digite el nombre de la ficha").not().isEmpty(),
    check('nivelFormacion', "Digite el nivel de formacion").not().isEmpty(),
    check('fechaInicio', "Digite la fecha de Inicio").not().isEmpty(),
    check('fechaFin', "Digite la fecha de fin").not().isEmpty(),
    validarCampos
],httpFicha.putEditar)

router.put('/inactivar/:id', [
    validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    validarCampos
],httpFicha.putInactivar)

router.put('/activar/:id', [
    validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    validarCampos
],httpFicha.putActivar)

export default router
