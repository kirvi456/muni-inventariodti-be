import { createCanvas } from 'canvas';
import JsBarcode from 'jsbarcode';
import QRCode from 'qrcode';

export const generateCodeBar = (code : string) => {

    try{

        const canvas = createCanvas(200, 100);
    
        JsBarcode(canvas, code);
    
        return canvas;
        
    } catch( error ) {
        console.log( error )
        throw new Error( 'No se pudo generar CODIGO DE BARRA' )
    }
}

export const generateQRCode = async( code : string ) => {
    try{    

        const canvas = createCanvas(200, 100);

        await QRCode.toCanvas(canvas, code);

        return canvas;

    } catch ( error ){
        console.log( error )
        throw new Error('No se pudo generara QR')
    }
}