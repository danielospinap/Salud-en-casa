var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema = new Schema({
    nombre: {
        type: String,
        required: 'nombre es obligatorio.'
    },
    descripcion: {
        type: String,
        required: 'descripcion es obligatorio.'
    },
    caracteristicas: {
        type: String,
        required: 'caracteristicas es obligatorio.'
    },
    volumen: {
        type: String,
        required: 'volumen es obligatorio.'
    },
    fotos: {
        type: String
    },
    categorias: {
        type: [String],
        required: 'categorias es obligatorio.'
    },
    soloMobile: {
        type: Boolean,
        required: 'soloMobile es obligatorio.'
    }
});

module.exports = mongoose.model('Producto', ProductoSchema);
