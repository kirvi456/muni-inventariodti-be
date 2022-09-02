import { Request, Response } from 'express'
import Actualizacion from '../models/actualizacion';

export const registrarActualizacion = async ( req : Request, res: Response ) => {

    try {

        const {
            nombreComponente,
            descAnterior,
            descNuevo,
            motivo,
            equipo,
        } = req.body;

        const usuario = req.currentUser._id;

        const actAGuardar = new Actualizacion({
            nombreComponente,
            descAnterior,
            descNuevo,
            motivo,
            equipo,
            usuario
        })

        const actualizacionGuardada  = await actAGuardar.save();

        res.json( actualizacionGuardada )


    } catch( error ) {
        console.log(error);
        res.status( 500 ).json({
            msg: '[ERROR]: No se registro la actualizacion. Contacte con el administrador.'
        })
    }

}