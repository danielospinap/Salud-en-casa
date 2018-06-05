var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PedidoSchema = new Schema({
    ruta: [{}],
    status: {
        type: [{
            type: String,
            enum: ['pending', 'ongoing', 'completed']
        }],
        default: ['pending']
    },
    destino: {}
});

module.exports = mongoose.model('Pedido', PedidoSchema);
