import path from 'path';
import fs from 'fs';

import { v4 as uuidv4 } from 'uuid';
import fileUpload from 'express-fileupload';


const extensionesPermitidas = {
    img: ['png', 'jpg', 'jpeg'],
    pdf: ['pdf']
}


export const subirArchivo = ( 
    files : fileUpload.FileArray, 
    tipoArchivo : 'img' | 'pdf', 
    carpeta : string = '', 
    archivoBorrarName : string = ''
    ) : Promise<string> => {
        
    return new Promise((resolve, reject) => {
        const archivo = files.archivo  as fileUpload.UploadedFile;
    
        const archivoCortado = archivo.name.split('.');
        const extension = archivoCortado[ archivoCortado.length -1 ];
    
        // Validar extension
        if( !extensionesPermitidas[tipoArchivo].includes(extension) ){            
            return reject(`El tipo de archivo <${extension}> no es valido`);
        }   
    
        // Generar el path del archivo
        const nombreTmp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTmp);
        
        // Borrar si exite
        const archivoBorrarPath = path.join(__dirname, '../uploads/', carpeta, archivoBorrarName);
        if (archivoBorrarName !== '' && archivoBorrarName && fs.existsSync( archivoBorrarPath )){
            fs.unlinkSync( archivoBorrarPath );
        }

        // Subir el archivo
        archivo.mv(uploadPath, function(err) {
            if (err) {
                console.log(err);
                return reject(err);
            }    

            resolve(nombreTmp);
        });

    })

}

export const obtenerArchivoPath = ( 
    carpeta : string = '', 
    archivoName : string = '', 
    notFound : string = 'no-image.jpg') : Promise<string> => {
    return new Promise((resolve, reject) => {
        const pathNotFound = path.join(__dirname, '../assets/notfound', notFound);
        
        // Verificar si existe
        const archivoEnviarPath = path.join(__dirname, '../uploads/', carpeta, archivoName);
        if (archivoName !== '' && archivoName && fs.existsSync( archivoEnviarPath )){
            return resolve( archivoEnviarPath );
        }
        return resolve( pathNotFound );
    })

}
