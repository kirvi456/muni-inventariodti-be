import { model, Schema } from 'mongoose'

const CambioSchema = new Schema({
    campo : {
        type : String,
        required: [ true, 'El campo que cambio es obligatorio' ],
    },
    valorAnterior : {

    },
    valorNuevo : {

    },
    fecha : {
        type: Number,
        required: [ true, 'La fecha es requerida'],
        default: () => ( (new Date() ).getTime() )
    }
})

export default model('Cambio', CambioSchema);