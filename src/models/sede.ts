import { Schema, model } from 'mongoose';

import { Usuario } from '.';

export interface SedeI {
    _id: string,
    nombre: string,
    direccion: string,
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

const SedeSchema = new Schema({
    nombre : {
        type: String,
        required: [true, 'El nombre de la sede es obligatorio'],
        unique: true
    },
    direccion : {
        type: String,
        required: [true, 'La dirección es obligatoria']
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

SedeSchema.methods.toJSON = function () {
    const {__version, __v, activo, ...Sede } = this.toObject();

    return Sede;
}

export default model('Sede', SedeSchema);