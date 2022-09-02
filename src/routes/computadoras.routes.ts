import { Router } from 'express';
import { check } from 'express-validator';

import { 
    actulizarComputadora,
    actulizarImg, 
    crearComputadora, 
    getIPS, 
    getPCS, 
    obtenerCodigoBarras, 
    obtenerImagen,
    obtenerPC
} from '../controllers/computadoras.controller';

import validarJWT from '../middlewares/validar-jwt';
import { existeSede, existeUnidad, exitePC, responsableNotEmpty } from '../helpers';
import validarCampos from "../middlewares/validar-campos";
import { esAdmin } from '../middlewares/validar-roles';
const router = Router();

// Crear Computadora
router.post(
    '/',
    [
        validarJWT,
        // campos obligatorios
        check('nombreEquipo', 'El Nombre del equipo es obligatorio').not().isEmpty(),
        check('unidad', 'Se debe especificar la Unidad/Dirección ').not().isEmpty(),
        check('ubicacion', 'Se debe de especificar la Ubicación').not().isEmpty(),
        check('tipo', 'Se debe especificar el tipo del equipo').not().isEmpty(),
        check('SO', 'Se debe de especificar el Tipo de SO').not().isEmpty(),
        check('SODesc', 'ESe debe de especificar el SO').not().isEmpty(),
        check('SOoriginal', 'Se debe de especificar si el SO es original').isBoolean(),
        check('ofimaticaDesc', 'Se debe de especificar la herramienta de Ofimática').not().isEmpty(),
        check('ofimaticaOriginal', 'Se debe de especificar si la ofimatica es original').not().isEmpty(),
        check('procesador', 'Se debe de especificar el procesador').not().isEmpty(),
        check('marcaMonitor', 'Se debe de especificar la marca del monitor').not().isEmpty(),
        check('serieMonitor', 'Se debe de especificar la serie del monitor').not().isEmpty(),
        check('tamMonitor', 'Se debe de especificar el tamaño del monitor en pulgadas').isNumeric(),
        check('teclado', 'Se debe de especificar el teclado').not().isEmpty(),
        check('mouse', 'Se debe de especificar el mouse').not().isEmpty(),
        check('ups', 'Se debe de especificar si se cuenta con ups').isBoolean(),
        check('internet', 'Se debe de especificar si se cuenta con internet').isBoolean(),
        // Arrays que no pueden estar vacios
        check('almacenamiento', 'Se debe de especificar el almacenamiento').isArray().not().isEmpty(),
        check('RAM', 'Se debe de especificar la RAM').isArray().not().isEmpty(),
        // Existen en base de datos
        check('ubicacion', 'El ID de la sede no es valido').isMongoId(),
        check('unidad', 'El ID de la Unidad/Dirección no es valido').isMongoId(),
        check('ubicacion').custom( existeSede ),
        check('unidad').custom( existeUnidad ),

        check('responsable').custom( responsableNotEmpty ),       
        
        validarCampos
    ],
    crearComputadora
)

router.put(
    '/imagen/:_id',
    [
        validarJWT,
        check('_id', 'El ID no es valido').isMongoId(),
        check('_id').custom( exitePC ),
        validarCampos
    ],
    actulizarImg
)


router.get(
    '/imagen/:_id',
    [
        check('_id', 'El ID no es valido').isMongoId(),
        check('_id').custom( exitePC ),
        validarCampos
    ],
    obtenerImagen
)

router.get(
    '/codebar/:_id',
    [
        validarJWT,
        check('_id', 'El ID no es valido').isMongoId(),
        check('_id').custom( exitePC ),
        
        validarCampos
    ], 
    obtenerCodigoBarras
)

// Actualizar Computadora
router.put(
    '/',
    [
        validarJWT,
        esAdmin,

        // Verificar que si exista la computadora
        check('_id', 'El ID no es valido').isMongoId(),
        check('_id').custom( exitePC ),
        // campos obligatorios
        check('nombreEquipo', 'El Nombre del equipo es obligatorio').not().isEmpty(),
        check('unidad', 'Se debe especificar la Unidad/Dirección ').not().isEmpty(),
        check('ubicacion', 'Se debe de especificar la Ubicación').not().isEmpty(),
        check('tipo', 'Se debe especificar el tipo del equipo').not().isEmpty(),
        check('SO', 'Se debe de especificar el Tipo de SO').not().isEmpty(),
        check('SODesc', 'ESe debe de especificar el SO').not().isEmpty(),
        check('SOoriginal', 'Se debe de especificar si el SO es original').isBoolean(),
        check('ofimaticaDesc', 'Se debe de especificar la herramienta de Ofimática').not().isEmpty(),
        check('ofimaticaOriginal', 'Se debe de especificar si la ofimatica es original').not().isEmpty(),
        check('procesador', 'Se debe de especificar el procesador').not().isEmpty(),
        check('marcaMonitor', 'Se debe de especificar la marca del monitor').not().isEmpty(),
        check('serieMonitor', 'Se debe de especificar la serie del monitor').not().isEmpty(),
        check('tamMonitor', 'Se debe de especificar el tamaño del monitor en pulgadas').isNumeric(),
        check('teclado', 'Se debe de especificar el teclado').not().isEmpty(),
        check('mouse', 'Se debe de especificar el mouse').not().isEmpty(),
        check('ups', 'Se debe de especificar si se cuenta con ups').isBoolean(),
        check('internet', 'Se debe de especificar si se cuenta con internet').isBoolean(),
        // Arrays que no pueden estar vacios
        check('almacenamiento', 'Se debe de especificar el almacenamiento').isArray().not().isEmpty(),
        check('RAM', 'Se debe de especificar la RAM').isArray().not().isEmpty(),
        // Existen en base de datos
        check('ubicacion', 'El ID de la sede no es valido').isMongoId(),
        check('unidad', 'El ID de la Unidad/Dirección no es valido').isMongoId(),
        check('ubicacion').custom( existeSede ),
        check('unidad').custom( existeUnidad ),

        check('responsable').custom( responsableNotEmpty ),       
                
        validarCampos
    ],
    actulizarComputadora
)

router.get(
    '/ips',
    [

    ],
    getIPS
)

router.get(
    '/:_id',
    [
        check('_id', 'El ID no es valido').isMongoId(),
        check('_id').custom( exitePC ),
        validarCampos
    ],
    obtenerPC
)


router.get(
    '/',
    [
        check('sedeID', 'No se especifico la sede').not().isEmpty(),
        check('sedeID', 'Sede ID no es valido').isMongoId(),
        check('unidadID', 'No se especifico la unidad').not().isEmpty(),
        check('unidadID', 'Unidad ID no es valido').isMongoId(),
        validarCampos
    ],
    getPCS
)
export default router;