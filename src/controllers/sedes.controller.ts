import { Request, Response } from 'express';
import { formatFinalError } from '../helpers/error-messages';
import Sede from '../models/sede';


export const crearSede = async ( req: Request, res: Response ) => {
    try {
        const { nombre, direccion } = req.body;
        
        const usuarioCreo = req.currentUser;

        const nuevaSede = new Sede({nombre, direccion, usuarioCreo});

        const sedeGuardada = await nuevaSede.save();

        res.json({
            sede : sedeGuardada
        })

    } catch( error ){
        console.log( error );
        res
        .status(500)
        .json(formatFinalError( error, 'No se pudo crear sede' ))
    }
}

export const obtenerTodas = async ( req : Request, res : Response ) => {
    try{

        const result = await Sede.find({activo : true}).select({nombre: 1, id: 1, direccion: 1}).sort({nombre: 1});

        res.json( { result  });

    } catch( error ){
        console.log( error );
        res.json([])
    }
}

export const actualizarSede = async ( req : Request, res : Response ) => {

    try{

        const { _id } = req.params;
        const { ...nuevaInfo } = req.body;
        
        const usuarioActualiza = req.currentUser;
        
        const modificacion = {
            desc: "Actualizacion",
            usuario: usuarioActualiza
        }

        const sedeActualizar = await Sede.findOneAndUpdate( 
            { 
                _id 
            }, 
            { 
                ...nuevaInfo, 
                $push: {
                    'modificaciones': modificacion
                }
            },
            {
                new: true
            }
        );
        
        
        res.json({sedeActualizar});

    } catch( error ){
        console.log( error );
        res
        .status(500)
        .json(formatFinalError( error, 'No se pudo actualizar sede' ))
    }

}

export const borrarSede = async ( req : Request, res : Response ) => {

    try{

        const { _id } = req.params;
        
        const usuarioActualiza = req.currentUser;
        
        const modificacion = {
            desc: "Eliminacion",
            usuario: usuarioActualiza
        }

        const sedeActualizar = await Sede.findOneAndUpdate( 
            { 
                _id 
            }, 
            { 
                activo : false, 
                $push: {
                    'modificaciones': modificacion
                }
            },
            {
                new: true
            }
        );
        
        
        res.json({sedeActualizar});

    } catch( error ){
        console.log( error );
        res
        .status(500)
        .json(formatFinalError( error, 'No se pudo eliminar sede' ))
    }

}