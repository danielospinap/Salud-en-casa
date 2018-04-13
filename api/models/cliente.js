var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = new Schema({
    correo: {
        type: String,
        required: 'usuario es obligatorio.'
    },
    nombre: {
        type: String
    },
    apellido: {
        type: String
    },
    edad: {
        type: String
    },
    genero: {
        type: String
    },
    usuario: {
        type: String,
        required: 'usuario es obligatorio.'
    },
    clave: {
        type: String,
        required: 'password es obligatorio.'
    },
    claveInicial: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Client', ClienteSchema);
