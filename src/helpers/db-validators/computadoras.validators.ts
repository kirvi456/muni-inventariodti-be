import Computadora from "../../models/computadora";
import { getErrorMessage } from "../error-messages";


export const responsableNotEmpty = ( responsable : any ) => {
    try{

        if( typeof responsable !== 'object' ){
            throw new Error('El responsable no tiene el formato correcto')
        }
        const { nombre, puesto } = responsable;

        if( !nombre ) {
            throw new Error('No se indicó el nombre del reponsable')
        }
        if( !puesto ) {
            throw new Error('No se indicó el puesto del reponsable')
        }

        return true;
    } catch( error ){
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
}

export const exitePC = async( _id : string ) => {
    try{

        const PC = await Computadora.findById(_id);

        if( !PC ){
            throw new Error('No se encontro computadora');
        }

        return true;
    } catch ( error ) {
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
}