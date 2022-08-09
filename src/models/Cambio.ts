import { model, Schema } from 'mongoose'
import Usuario      from './usuario';
import Computadora  from './computadora';


const ActividadSchema = new Schema({
    desc : {
        type : String,
        required: [ true, 'La descripción es obligatoria' ],
    },
    conclusion : {
        type: String,
        required: [true, 'Se debe especificar la resolucion de la actividad']
    },
    usuario : {
        type: Schema.Types.ObjectId,
        ref: Usuario,
        required: true
    },
    equipo : {
        type: Schema.Types.ObjectId,
        ref: Computadora,
        required: true
    },
    fecha : {
        type: Number,
        required: [ true, 'La fecha es requerida'],
        default: () => ( (new Date() ).getTime() )
    },
    tipo : {
        type: String,
        required: [ true, 'Se debe especificar el tipo de actividad']
    }
})

export default model('Actividad', ActividadSchema);