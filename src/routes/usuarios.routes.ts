import Router from 'express';
import { check } from 'express-validator';


import { validarJWT } from '../middlewares/validar-jwt';
import { validarCampos } from '../middlewares/validar-campos';
import { contieneArchivo } from '../middlewares/validar-uploads';
import { esAdmin, tieneRol } from '../middlewares/validar-roles';


import { noEmailRepetido, noUsernameRepetido, esRolValido, existeUsuarioPorID } from '../helpers/db-validators';

import {
    getUsuarios,
    obtenerAvatar,
    postUsuarios,
    actulizarImg,
    putUsuarios,
    deleteUsuario
} from '../controllers/usuarios.controller';

const router = Router();

router.get('/', getUsuarios);

router.get('/avatar/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorID ),
    validarCampos
], obtenerAvatar);

router.post('/', [
        validarJWT,
        tieneRol(['ADMIN', 'DIRECTORPMT']),
        check('usuario', 'El usuario es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('correo', 'El corre es obligatorio').not().isEmpty(),
        check('pw', 'La Contraseña es obligatoria').not().isEmpty(),
        check('pw', 'La contraseña debe ser mayor a 6 letras').isLength({min: 6}),
        check('usuario').custom( noUsernameRepetido ),
        check('correo').custom( noEmailRepetido ),      
        check('rol').custom( esRolValido ),
        validarCampos
    ], postUsuarios)

router.post('/registro', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('correo', 'El corre es obligatorio').not().isEmpty(),
    check('pw', 'La Contraseña es obligatoria').not().isEmpty(),
    check('pw', 'La contraseña debe ser mayor a 6 letras').isLength({min: 6}),
    check('usuario').custom( noUsernameRepetido ),
    check('correo').custom( noEmailRepetido ),      
    check('rol').custom( esRolValido ),
    validarCampos
], postUsuarios)

router.put('/avatar', [
    contieneArchivo,
    validarJWT,
    validarCampos
], actulizarImg);

router.put('/:id', [
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existeUsuarioPorID ),
        validarCampos
    ], putUsuarios);


router.delete('/:id', [
        validarJWT,
        esAdmin,
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existeUsuarioPorID ),
        validarCampos
    ], deleteUsuario)

export default router;