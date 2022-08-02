
export const getErrorMessage = ( error : unknown ) : string => {
    if( typeof error === 'string' )
        return error.toString();
    else if ( error instanceof Error )
        return error.message;
    return 'Contacte con el administrador.';
}

export const formatFinalError = ( error : unknown, msg : string ) : { msg : string } => {

    const errorMsg = { msg: ''};

    if( typeof error === 'string' )
        errorMsg.msg = error.toString();
    else if ( error instanceof Error )
        errorMsg.msg =  error.message;
    else
        errorMsg.msg =  `${msg} Contatacte con el administrador.`;

    return errorMsg;
}