import { Router } from "express";
import { check } from "express-validator";
import { actualizarSede, crearSede, obtenerTodas, borrarSede } from "../controllers/sedes.controller";
import validarCampos from "../middlewares/validar-campos";
import validarJWT from "../middlewares/validar-jwt";
import { esAdmin } from "../middlewares/validar-roles";

import { existeSede } from '../helpers/db-validators/sedes.validators';

const router = Router();

// Ruta para crear sede
router.post(
    '/',
    [
        validarJWT,
        esAdmin,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('direccion', 'La dirección es obligatorio').not().isEmpty(),
        validarCampos,
    ],    
    crearSede
)

// Ruta para eliminar sede
router.delete(
    '/:_id',
    [
        check('_id').custom( existeSede ),
        validarJWT,
        esAdmin,
        validarCampos,
    ],    
    borrarSede
)

// Ruta para actualizar sede
router.put(
    '/:_id',
    [
        check('_id').custom( existeSede ),
        validarJWT,
        esAdmin,
        validarCampos,
    ],    
    actualizarSede
)

// Ruta para obtener todas las sedes
router.get('/', obtenerTodas);

export default router;