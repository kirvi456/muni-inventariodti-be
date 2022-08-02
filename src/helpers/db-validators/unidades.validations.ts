import { getErrorMessage } from "../error-messages";
import Unidad from '../../models/unidad';

export const existeUnidad = async (id = '') => {
    try{
        const unidadBusqueda = await Unidad.findOne( { id, active : true } );

        if( !unidadBusqueda )
            throw new Error(`Unidad no econtrada`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
}