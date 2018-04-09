var mongoose = require('mongoose'),
    Producto = mongoose.model('Producto');

var logController = require('./log.js');

exports.crearProducto = function (req, res) {
    var nuevoProducto = new Producto(req.body);
    nuevoProducto.save(function (err, prod) {
        if (err) {
            res.send(err);
        }
        logController.generateLog(req.body.autor, 'create', prod);
        res.json(prod);
    });
}

function listMobileProducts(req, res) {
  Producto.find({}, function(err, prod) {
    if (err)
      res.send(err);
    res.json(prod);
  });
};

function listWebProducts(req, res) {
  Producto.find({soloMobile: false}, function(err, prod) {
    if (err)
      res.send(err);
    res.json(prod);
  });
};

exports.listProducts = function(req, res) {
    if (req.query.origen === 'web') {
        listWebProducts(req,res)
    } else if (req.query.origen === 'mobile') {
        listMobileProducts(req,res)
    } else {
        res.status(404).send('Falta origen.')
    }
};



/*
exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
exports.delete_a_task = function(req, res) {
  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};
*/
