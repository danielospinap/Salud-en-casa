var mongoose = require('mongoose'),
    Producto = mongoose.model('Producto');

exports.crearProducto = function (req, res) {
    Producto.find({nombre: req.body.nombre}, function (err, emple) {
        if (emple.length === 0) {
            var nuevoProducto = new Producto(req.body);
            nuevoProducto.save(function (err, pro) {
                if (err) {
                    res.send(err);
                }

                res.status(201).send('Producto creado.');
            });
        }else {
            res.send('El producto ya existe');
        }
    });
}


exports.findProducto = function(req, res){
    Producto.find({nombre: req.body.nombre}, function(err, pro){
        if(err){
            res.send(err);
        }
        if(emple.length >0){
            res.status(200).json(pro);
        }
    });
};

exports.todosLosProductos = function(res, req){
        Producto.find({},function(err, pro){
            if(err){
                res.send(err);
            }
            if(emple.length>0){
                res.status(200).json(pro);
            }
        });
};

exports.updateProducto = function(res, req){
    Producto.findOneAndUpdate({nombre: req.body.nombre},function(err, cli){
        if (err) {
            res.send(err);
        }
        res.status(200).send('Producto actualizado');
    });
};
