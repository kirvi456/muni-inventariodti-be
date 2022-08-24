import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

import { generarJWT } from "../helpers/generar-jwt";

import Usuario from "../models/usuario";

export const login = async (req: Request, res: Response) => {

    const { usuario, pw } = req.body;

    try {
        // Verificar si el email existe
        const usuarioInstancia = await Usuario.findOne({ $or:[{usuario}, {correo: usuario}] });
        if (!usuarioInstancia) {
        return res.status(400).json({
            msg: "Usuario / Contraseña no son correctos (Usuario/Correo)",
        });
        }

        // Verificar que el usuario este activo
        if (!usuarioInstancia.estado) {
        return res.status(400).json({
            msg: "Usuario desctivado - Comuníquese con el administrador",
        });
        }

        // Verificar la contraseña
        const validPW = bcryptjs.compareSync(pw, usuarioInstancia.pw);
        if (!validPW) {
            return res.status(400).json({
                msg: "Usuario / Contraseña no son correctos (Contraseña)",
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuarioInstancia._id.toString() );

        res.json({
            usuarioInstancia,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador",
        });
    }
    
};

