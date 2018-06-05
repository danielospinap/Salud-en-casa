module.exports = function(app) {
    var pedido = require('../controllers/pedidoController');
  
    // todoList Routes
    app.route('/pedido')
      .get(pedido.listar_pedidos)
      .post(pedido.crear_pedido);
  
  
    app.route('/pedido/:pedidoId')
      .get(pedido.ver_pedido)
      .put(pedido.actualizar_pedido)
  };
  
  