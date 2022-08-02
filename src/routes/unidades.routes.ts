import { Router } from "express";
import { check } from "express-validator";
import { actualizarUnidad, crearUnidad, obtenerTodas, borrarUnidad } from "../controllers/unidades.controller";
import validarCampos from "../middlewares/validar-campos";
import validarJWT from "../middlewares/validar-jwt";
import { esAdmin } from "../middlewares/validar-roles";

import { existeUnidad } from '../helpers/db-validators/unidades.validations';

const router = Router();

// Ruta para crear unidad
router.post(
    '/',
    [
        validarJWT,
        esAdmin,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('abreviatura', 'La abreviatura es obligatoria').not().isEmpty(),
        validarCampos,
    ],    
    crearUnidad
)

// Ruta para eliminar unidad
router.delete(
    '/:_id',
    [
        check('_id').custom( existeUnidad ),
        validarJWT,
        esAdmin,
        validarCampos,
    ],    
    borrarUnidad
)

// Ruta para actualizar unidad
router.put(
    '/:_id',
    [
        check('_id').custom( existeUnidad ),
        validarJWT,
        esAdmin,
        validarCampos,
    ],    
    actualizarUnidad
)

// Ruta para obtener todas las unidad
router.get('/', obtenerTodas);

export default router;