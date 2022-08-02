import Usuario from '../models/usuario';
import Rol from '../models/rol';
import { getErrorMessage } from './error-messages';



export const esRolValido = async(rol = '') => {
    try{
        const existeRol = await Rol.findOne({rol});
        if(!existeRol) {
            throw new Error(`El rol <${rol}> no existe`);
        }
    } catch ( error ){
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
}

export const noEmailRepetido = async(correo = '') => {
    try {
        const existeEmail = await Usuario.findOne({correo});
        if(existeEmail) {
            throw new Error(`El email <${correo}> ya esta registrado`);
        }
    } catch ( error ){
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
}

export const noUsernameRepetido = async(usuario = '') => {
    try {
        const existeEmail = await Usuario.findOne({usuario});
        if(existeEmail) {
            throw new Error(`El usuario <${usuario}> ya esta registrado`);
        }
    } catch ( error ){
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
}

export const existeUsuarioPorID = async(id = '') => {
    try{
        const existeUsuario = await Usuario.findById(id);
        if(!existeUsuario) {
            throw new Error(`El usuario id:<${id}> no existe`);
        }
    } catch ( error ){        
        console.log(error)
        throw new Error( getErrorMessage(error) );
    }
}

