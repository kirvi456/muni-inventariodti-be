import { getErrorMessage } from "../error-messages";
import Sede from '../../models/sede';

export const existeSede = async (_id = '') => {
    try{
        const sedeBusqueda = await Sede.findOne( { _id, active : true } );

        if( !sedeBusqueda )
            throw new Error(`Sede no econtrada`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
}