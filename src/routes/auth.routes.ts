import { Router } from 'express';
import { check } from 'express-validator';

import { login, validarSesion } from '../controllers/auth.controller';

import { validarCampos } from '../middlewares/validar-campos';
import validarJWT from '../middlewares/validar-jwt';

const router = Router();

router.post('/login', [
    check('usuario', 'El usuario/correo es obligatorio').not().isEmpty(),
    check('pw', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.get('/validarsesion', [
    validarJWT,
    validarCampos
], validarSesion)

export default router;