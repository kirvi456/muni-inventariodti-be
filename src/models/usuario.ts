import { Schema, model } from 'mongoose';

export interface IUsuario {
    nombre: string;
    usuario: string;
    correo: string;
    pw: string;
    rol: string;
    img?: string | undefined;
    estado?: boolean | undefined;
} 

const UsuarioSchema = new Schema({
    nombre: {
        type : String,
        required: [true, 'El nombre es obligatorio']
    },
    usuario: {
        type: String,
        required: [true, 'El usuario es requerido'],
        unique: true
    },
    correo: {
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true
    },
    pw: {
        type: String,
        required: [true, 'La contraseña es requerida'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: [true, 'El rol es requerido'],
    },
    estado: {
        type: Boolean,
        default: true
    }
});


UsuarioSchema.methods.toJSON = function() {
    const {__version, __v, pw, ...usuario} = this.toObject();
    return usuario;
}

export default model('Usuario', UsuarioSchema);
