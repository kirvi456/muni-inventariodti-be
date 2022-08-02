import { Router } from 'express';
import { check } from 'express-validator';

import { login } from '../controllers/auth.controller';

import { validarCampos } from '../middlewares/validar-campos';

const router = Router();

router.post('/login', [
    check('usuario', 'El usuario/correo es obligatorio').not().isEmpty(),
    check('pw', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

export default router;