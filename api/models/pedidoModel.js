var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PedidoSchema = new Schema({
    latitud: {
        type: String,
        required: 'Kindly enter the latitud of the pedido'
    },
    longitud: {
        type: String,
        required: 'Kindly enter the nalongitudme of the pedido'
    },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  }
});

module.exports = mongoose.model('Pedido', PedidoSchema);
