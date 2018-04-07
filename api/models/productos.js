var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema = new Schema({
    nombre: {
        type: String,
        required: 'nombre es obligatorio.',
        unique: true
    },
    descripcion: {
        type: String,
        required: 'descripcion es obligatoria'
    },
    unidades: {
        type: Number,
        required: 'El numero de unidades es obligatorio'
    },
    imagen: {
        type: String
    },
    mobile: {
        type: Boolean,
        default: false
    }

});

module.exports = mongoose.model('Producto', ProductoSchema);
