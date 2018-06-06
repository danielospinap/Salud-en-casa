var mongoose = require('mongoose'),
    Pedido = mongoose.model('Pedido');

exports.listar_pedidos = function(req, res) {
    Pedido.find({}, function(err, pedido) {
        if (err)
            res.send(err);
        res.json(pedido);
    });
};

exports.crear_pedido = function(req, res) {
    var new_pedido = new Pedido();
    new_pedido.destino = req.body;
    new_pedido.save(function(err, pedido) {
        if (err)
            res.send(err);
        res.json(pedido);
    });
};


exports.ver_pedido = function(req, res) {
    Pedido.findById(req.params.pedidoId, function(err, pedido) {
        if (err)
            res.send(err);
        res.json(pedido);
    });
};


exports.actualizar_pedido = function(req, res) {
    
    Pedido.findById(req.params.pedidoId, function(err, pedido) {
        if(err){
            res.send(err);
        }
        pedido.ruta.push(req.body);
        pedido.status = 'ongoing';
        pedido.save(function (err, pedidoActualizado){
            if(err){
                res.send(err);
            }
            res.send(pedidoActualizado);
        });
    });
};

