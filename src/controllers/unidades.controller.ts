import { Request, Response } from 'express';
import { formatFinalError } from '../helpers/error-messages';
import Unidad from '../models/unidad';


export const crearUnidad = async ( req: Request, res: Response ) => {
    try {
        let { nombre, abreviatura } = req.body;

        const usuarioCreo = req.currentUser;

        const nuevaUnidad = new Unidad({nombre, abreviatura, usuarioCreo});

        const unidadGuardada = await nuevaUnidad.save();

        res.json({
            unidad : unidadGuardada
        })

    } catch( error ){
        console.log( error );
        res.status(500)
            .json(formatFinalError( error, 'No se pudo crear unidad/dirección' ))
    }
}

export const obtenerTodas = async ( req : Request, res : Response ) => {
    try{

        const result = await Unidad.find({activo : true}).select({nombre: 1, id: 1, abreviatura: 1}).sort({nombre: 1});

        res.json( { result  });

    } catch( error ){
        console.log( error );
        res.json([])
    }
}

export const actualizarUnidad = async ( req : Request, res : Response ) => {

    try{

        const { _id } = req.params;
        const { ...nuevaInfo } = req.body;
        
        const usuarioActualiza = req.currentUser;
        
        const modificacion = {
            desc: "Actualizacion",
            usuario: usuarioActualiza
        }

        const unidadActualizar = await Unidad.findOneAndUpdate( 
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
                
        res.json({unidadActualizar});

    } catch( error ){
        console.log( error );
        res.status(500)
            .json(formatFinalError( error, 'No se pudo actualizar unidad/unidad.' ))
    }

}

export const borrarUnidad = async ( req : Request, res : Response ) => {

    try{

        const { _id } = req.params;
        
        const usuarioActualiza = req.currentUser;
        
        const modificacion = {
            desc: "Eliminacion",
            usuario: usuarioActualiza
        }

        const unidadActualizar = await Unidad.findOneAndUpdate( 
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
        
        res.json({unidadActualizar});

    } catch( error ){
        console.log( error );        
        res.status(500)
            .json(formatFinalError( error, 'No se pudo eliminar unidad/dirección' ))
    }

}