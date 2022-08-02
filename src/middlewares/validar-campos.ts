import { Request, Response, NextFunction } from 'express';

import { validationResult }  from 'express-validator';

export const validarCampos = (req : Request, res : Response, next : NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors.array())
        return res.status(400).json({msg: `${ errors.array({onlyFirstError: true})[0].msg }`});
    }
    next();
}

export default validarCampos;