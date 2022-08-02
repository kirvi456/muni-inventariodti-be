import { Schema, model } from 'mongoose';
import { Usuario, Unidad } from '.';
import Sede     from './sede';


interface Responsable {
    nombre : string,
    puesto : string,
    telefono : string
}

export interface ComputadoraI {
    _id : string,
    ID : string,
    imgCodigoBarras: string,
    nombreEquipo: string,
    img: string,
    unidad: string,
    ubicacion: string, //palacio, santa ines, etc
    activo: boolean,
    responsable : Responsable,
    tipo: 'Desktop' | 'Laptop' | 'All In One',
    SO: 'Linux' | 'Windows' | 'Mac',
    SODesc: string,
    SOoriginal: boolean,
    ofimaticaDesc: string,
    ofimaticaOriginal: boolean,
    almacenamiento: string[],
    RAM: string[],
    procesador: string,
    video: string[],
    marcaMonitor: string,
    serieMonitor: string,
    tamMonitor: number,
    teclado: string,
    mouse: string,
    otrosPerifericos: string[],
    ups: boolean,
    upsDesc: string,
    internet: boolean,
    interfazInternet: 'cable' | 'wifi',
    ip: string,
    mac: string,
    permisos: string,
    creadoFecha: number,
    usuarioCreo: string,
}


const ComputadoraSchema = new Schema({
    ID: {
        type : String,
        required: [true, 'El UID es obligatorio'],
        unique: true
    },
    nombreEquipo: {
        type: String,
        required: [true, 'El Nombre es obligatorio']
    },
    imgCodigoBarras: {
        type: String,
    },
    img: {
        type: String,
    },
    ubicacion: {
        type: Schema.Types.ObjectId,
        ref: Sede,
        required: true
    },    
    unidad: {
        type: Schema.Types.ObjectId,
        ref: Unidad,
        required: true
    },
    activo: {
        type: Boolean,
        default: true,
        required: true
    },
    responsable: {
        nombre : {
            type: String,
            required: [true, 'El Nombre de Usuario es obligatorio'],
        },
        puesto: {
            type: String,
            required: [true, 'El Puesto del usuario es obligatorio'],
        },
        telefono: {
            type: String,
        }
    },
    tipo: {
        type: String,
        required: [true, 'El Tipo de la computadora es obligatorio']
    },
    SO: {
        type: String,
        required: [true, 'El SO de la computadora es obligatorio']
    },
    SODesc: {
        type: String,
        required: [true, 'La Descripcion del SO de la computadora es obligatorio']
    },
    SOoriginal:{
        type: Boolean,
        requried: [true, 'Si es original es obligatorio']
    },
    ofimaticaDesc: {
        type: String,
        required: [true, 'La Descripcion de Ofimatica de la computadora es obligatorio']
    },
    ofimaticaOriginal: {
        type: Boolean,
        requried: [true, 'Si es original ofimatica es obligatorio']
    },
    almacenamiento: {
        type: [String],
    },
    RAM: {
        type: [String],
    },
    procesador: {
        type: String,
        required: [true, 'El Procesador de la computadora es obligatorio']
    },
    video:{
        type: [String],
    },
    marcaMonitor: {
        type: String,
        required: [true, 'La Marca del Monitor de la computadora es obligatorio']
    },
    serieMonitor: {
        type: String,
        required: [true, 'La Serie del Monitor de la computadora es obligatorio']
    },
    tamMonitor: {
        type: Number,
        required: [true, 'El Tamaño del Monitor de la computadora es obligatorio']
    },
    teclado: {
        type: String,
        required: [true, 'El Teclado de la computadora es obligatorio']
    },
    mouse: {
        type: String,
        required: [true, 'El mouse de la computadora es obligatorio']
    },
    otrosPerifericos: {
        type: [String],
    },
    ups:{
        type: Boolean,
        required: [true, 'Se debe indicar si se cuenta con UPS']
    },
    upsDesc: {
        type: String
    },
    internet: {
        type: Boolean,
        required: [true, 'Se debe indicar si se cuenta con internet en la computadora']
    },
    ip: {
        type: String
    },
    mac: {
        type: String
    },
    permisos: {
        type: String
    },
    creadoFecha: {
        type: Number
    },
    usuarioCreo: {
        type: Schema.Types.ObjectId,
        ref: Usuario,
        required: true
    }
});

export default model('Computadora', ComputadoraSchema);