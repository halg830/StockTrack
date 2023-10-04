import { Router } from "express"
import httpFicha from "../controllers/ficha.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";

const router=new Router()

router.get('/obtenerFichas',httpFicha.getObtenerFichas)

router.get('/obtenerFichaById/:id',[
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    validarCampos
],httpFicha.getObtenerFichasid)

router.get('/obtenerFichaNumero/:numero',[
    check("numero","Digite el numero de la ficha").not().isEmpty(),
    validarCampos
],httpFicha.getObtenerFichasNumero)

router.post('/agregarFicha', [
    check('codigo',"Digite el codigo de la ficha").not().isEmpty(),
    check('nombre',"Digite el nombre de la ficha").not().isEmpty(),
    check('nivelFormacion', "Digite el nivel de formacion").not.isEmpty(),
    check('fechaInicio', "Digite la fecha de Inicio").not().isEmpty(),
    check('fechaFin', "Digite la fecha de fin").not().isEmpty(),
    check('idArea', "Digite el id del area").not().isEmpty(),
    check('idArea', "Digite el id del area").isMongoId(),
    validarCampos
],httpFicha.postAgregarFichas)

router.put('/editarFicha/:id',[
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    check('codigo',"Digite el codigo de la ficha").not().isEmpty(),
    check('nombre',"Digite el nombre de la ficha").not().isEmpty(),
    check('nivelFormacion', "Digite el nivel de formacion").not.isEmpty(),
    check('fechaInicio', "Digite la fecha de Inicio").not().isEmpty(),
    check('fechaFin', "Digite la fecha de fin").not().isEmpty(),
    check('idArea', "Digite el id del area").not().isEmpty(),
    check('idArea', "Digite el id del area").isMongoId(),
    validarCampos
],httpFicha.putEditarFicha)

router.delete('/eliminarFicha/:id',[
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    validarCampos
],httpFicha.deleteFicha)

router.put('/inactivarFicha/:id', [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    validarCampos
],httpFicha.putFichaInactivar)

router.get('/obtenerFichasPorArea/:idArea',[
    check("idArea", "Digite el id").not().isEmpty(),
    check("idArea", "No es mongo ID").isMongoId(),
    validarCampos
],httpFicha.getFichasPorArea)

router.get('/obtenerFichasPorEstado/:estado',[
    check('estado',"Digite el estado").not().isEmpty(),
],httpFicha.getFichasEstado)
export default router
