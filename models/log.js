var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LogSchema = new Schema({
    actor: {
        type: String,
        required: 'actor es obligatorio.'
    },
    accion: {
        type: String,
        required: 'actor es obligatorio.'
    },
    fecha: {
        type: Date,
        required: 'fecha es obligatorio.'
    },
    valorAnterior: {
        type: Object
    },
    valorNuevo: {
        type: Object
    }
});

module.exports = mongoose.model('Log', LogSchema);
