import { Request, Response } from 'express';
import Computadora from '../models/computadora';
import { v4 as uuidv4 } from 'uuid';
import { formatFinalError } from '../helpers/error-messages';
import { generateQRCode } from '../utils/barchode';
import { obtenerArchivoPath, subirArchivo } from '../helpers/subir-archivo';

export const crearComputadora = async( req : Request, res : Response ) => {
    try{

        const {
	        nombreEquipo,
	        unidad,
	        ubicacion,
	        responsable,
	        tipo,
	        SO,
	        SODesc,
	        SOoriginal,
	        ofimaticaDesc,
	        ofimaticaOriginal,
	        almacenamiento,
	        RAM,
	        procesador,
	        video,
	        marcaMonitor,
	        serieMonitor,
	        tamMonitor,
	        teclado,
	        mouse,
	        otrosPerifericos,
	        ups,
	        upsDesc,
	        internet,
	        interfazInternet,
	        ip,
	        mac,
	        permisos,
        } = req.body;

		const ID = uuidv4();

        const compuInstancia = new Computadora({
			ID,
            nombreEquipo,
	        unidad,
	        ubicacion,
	        responsable,
	        tipo,
	        SO,
	        SODesc,
	        SOoriginal,
	        ofimaticaDesc,
	        ofimaticaOriginal,
	        almacenamiento,
	        RAM,
	        procesador,
	        video,
	        marcaMonitor,
	        serieMonitor,
	        tamMonitor,
	        teclado,
	        mouse,
	        otrosPerifericos,
	        ups,
	        upsDesc,
	        internet,
	        interfazInternet,
	        ip,
	        mac,
	        permisos,
            usuarioCreo: req.currentUser
        });

        const compuGuardada = await compuInstancia.save();

        res.json({ compuGuardada })

    } catch ( error ){
        console.log( error );

		res
		.status(500)
		.json( formatFinalError( error, 'No se pudo crear computadora' ) )
    }
}

export const obtenerCodigoBarras = async( req : Request, res : Response ) => {
	try {

		const { _id } = req.params;

		const computadora = await Computadora.findById( _id );

		// const imageCanvas = generateCodeBar( computadora!._id.toString() );

		const imageCanvas = await generateQRCode( computadora!._id.toString() );

		//create the headers for the response
		//200 is HTTTP status code 'ok'
		res.writeHead(
			200,
			//this is the headers object
			{
			//content-type: image/png tells the browser to expect an image
			"Content-Type": "image/png",
			}
		);

		//ending the response by sending the image buffer to the browser
		res.end(imageCanvas.toBuffer("image/png"));


	} catch ( error ){
        console.log( error );

		res
		.status(500)
		.json( formatFinalError( error, 'No se pudo crear computadora' ) )
    }
}

export const actulizarImg = async(req : Request, res : Response) => {
    try {
        const _id = req.params;		
		
        const PC = await Computadora.findById( _id );
		
        // Actualizar imagen borrando la anterior      
		const imgAnterior = PC!.img;
        const archivo = await subirArchivo(req.files!, 'img', 'computadoras/fotos', imgAnterior);


		const PCActualizada = await Computadora.findByIdAndUpdate( _id, { img: archivo },{ new : true });

        res.json(PCActualizada);

    } catch (error) {
        console.log(error);
        res.status( 500 ).json({
            msg: '[ERROR]: No se pudo actualizar la fotografia. Contacte con el administrador.'
        })
    }
}

export const obtenerPC = async(req : Request, res : Response) => {
    try{
        const { _id } = req.params;

        const result = await Computadora.findById( _id )
			.populate('ubicacion', 'nombre')
			.populate('unidad', 'nombre abreviatura');

        res.json( result );

    } catch (error){
        console.log(error);
        res.status( 500 ).json({
            msg: '[ERROR]: No se pudo actualizar la fotografia. Contacte con el administrador.'
        })
    }
}

export const obtenerImagen = async(req : Request, res : Response) => {
    try{
        const { _id } = req.params;

        const { img } = await Computadora.findById( _id ) || {img : ''};


        // Obtener la ruta del archivo o el notFound     
        const archivo = await obtenerArchivoPath('computadoras/fotos', img, 'not-avatar.png');

        res.sendFile( archivo );
    } catch (error){
        console.log(error);
        res.status( 500 ).json({
            msg: '[ERROR]: No se pudo actualizar la fotografia. Contacte con el administrador.'
        })
    }
}