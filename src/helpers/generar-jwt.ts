import jwt from 'jsonwebtoken';

export const generarJWT = ( _id : string ) => {
    return new Promise ((resolve, reject) => {
        const secret : string | undefined = process.env.SECRETPRIVATEKEY;
        
        if( !secret ) reject('No se pudo generar el token, secret undefined')

        const payload = { _id }

        jwt.sign(
            payload, 
            secret!, 
            {
                expiresIn: '2d'
            }, 
            (err, token) =>{
                if(err){
                    console.log(err);
                    reject('[ERROR]: No se pudo generar el token');
                } else resolve( token );
            }
        )
        
    })
}

export default generarJWT;