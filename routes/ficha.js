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
    check('codigo',"Ya existe una ficha con este codigo").custom(helpersFicha.validarFichaUnica),
    check('nombre',"Digite el nombre de la ficha").not().isEmpty(),
    check('nivelFormacion', "Digite el nivel de formacion").not().isEmpty(),
    check('fechaInicio', "Digite la fecha de Inicio").not().isEmpty(),
    check('fechaInicio',"Fecha Invalida").custom(helpersFicha.validarFechas),
    check('fechaFin', "Digite la fecha de fin").not().isEmpty(),
    check('idArea',"Digite el ID del área").not().isEmpty(),
    check('idArea',"No es Mongo ID").isMongoId(),
    validarCampos
],httpFicha.post)

router.put('/editar/:id',[
    validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    check('codigo',"Digite el codigo de la ficha").not().isEmpty(),
    check('codigo',"Ya existe una ficha con este codigo").custom((value, { req }) => {
        const { id } = req.params;
        return helpersFicha.validarFichaUnicaEditar(id, value);
    }),
    check('nombre',"Digite el nombre de la ficha").not().isEmpty(),
    check('nivelFormacion', "Digite el nivel de formacion").not().isEmpty(),
    check('fechaInicio', "Digite la fecha de Inicio").not().isEmpty(),
    check('fechaFin', "Digite la fecha de fin").not().isEmpty(),
    check('idArea',"Digite el ID del área").not().isEmpty(),
    check('idArea',"No es Mongo ID").isMongoId(),
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
