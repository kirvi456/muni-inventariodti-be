import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { Usuario } from '.';

export interface UnidadI {
    _id: string,
    nombre: string,
    abreviatura: string,
    activo: boolean,
    fechaCreado: number,
    usuarioCreo: string,
    modificaciones : {
        desc: string,
        usuario: string,
        fecha: number
    }[]
}

const ModificacionSchema = new Schema({
    desc: {
        type: String,
        required: [true, 'Se debe de especificar la modificacion']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: Usuario,
        required: true
    },
    fecha: {
        type: Number,
        default: () => (new Date()).getTime()
    }
});

const UnidadSchema = new Schema({
    nombre : {
        type: String,
        required: [true, 'El nombre de la unidad es obligatorio'],
        unique: true
    },
    abreviatura : {
        type: String,
        required: [true, 'La abreviatura es obligatoria'],
        unique: true,
        uppercase: true
    },
    activo : {
        type: Boolean,
        default: true
    },
    fechaCreado : {
        type: Number,
        default: () => (new Date()).getTime()
    },
    usuarioCreo : {
        type: Schema.Types.ObjectId,
        ref: Usuario,
        required: true
    },
    modificaciones : {
        type: [ ModificacionSchema ],
        default: () => []
    }
    
})

UnidadSchema.methods.toJSON = function () {
    const {__version, __v, activo, ...Unidad } = this.toObject();

    return Unidad;
}

export default model('Unidad', UnidadSchema);