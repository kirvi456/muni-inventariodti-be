import { model, Schema } from 'mongoose'
import Usuario      from './usuario';
import Computadora  from './computadora';


const ActualizacionSchema = new Schema({
    nombreComponente : {
        type : String,
        required: [ true, 'La descripción del componente que se esta actualizando es requerido' ]
    },
    descAnterior : {
        type: String,
        required: [true, 'Se debe especificar el componente que se esta actualizando']
    },
    descNuevo : {
        type: String,
        required: [true, 'Se debe especificar el nuevo componente']
    },
    motivo : {
        type: String,
        required: [true, 'Se debe especificar el motivo de la actualizacion']
    },
    equipo : {
        type: Schema.Types.ObjectId,
        ref: Computadora,
        required: true
    },
    usuario : {
        type: Schema.Types.ObjectId,
        ref: Usuario,
        required: true
    },
    fecha : {
        type: Number,
        required: [ true, 'La fecha es requerida'],
        default: () => ( (new Date() ).getTime() )
    }
})

export default model('Actualizacion', ActualizacionSchema);