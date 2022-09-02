import { Router } from 'express'
import { check } from 'express-validator';
import { registrarActualizacion } from '../controllers/actualizacion.controller';
import { exitePC } from '../helpers';
import validarCampos from '../middlewares/validar-campos';
import validarJWT from '../middlewares/validar-jwt';
import { esAdmin } from '../middlewares/validar-roles';

const router = Router();

router.post(
    '/',
    [
        validarJWT,
        esAdmin,
        check('equipo', 'Se debe especificar el equipo').not().isEmpty(),
        check('equipo', 'Equipo no es un mongo Id valido').isMongoId(),
        check('equipo').custom( exitePC ),

        check('nombreComponente', 'Se debe especificar el tipo de componente que se esta actualizando'),
        check('descAnterior', 'Se debe especificar el componente que se esta actualizando'),
        check('descNuevo', 'Se debe especificar el componente con el que se esta reemplazando'),
        check('motivo', 'Se debe especificar el motivo del cambio'),


        validarCampos
    ],
    registrarActualizacion
)

export default router;
