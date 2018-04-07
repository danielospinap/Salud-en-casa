var mongoose = require('mongoose'),
    Empleado = mongoose.model('Empleado');
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'noreplysaludencasaunnamed@gmail.com',
        pass: 'ContraSalud'
      }
    });

exports.crearEmpleado = function (req, res) {
    Empleado.find({usuario: req.body.usuario}, function (err, emple) {
        if (emple.length === 0) {
            var nuevoEmpleado = new Empleado(req.body);
            nuevoEmpleado.save(function (err, emple) {
                if (err) {
                    res.send(err);
                }
                res.status(201).send('Empleado creado.');
            });
        }else {
            res.send('El empleado ya existe');
        }
    });
}

exports.loginEmpleado = function(req, res) {
  Empleado.find({usuario: req.body.usuario, password: req.body.password}, function(err, emple) {
    if (err)
      res.send(err);
    if (emple.length > 0) {
        res.status(200).send('ok')
    }
    res.status(422).send('datos erroneos');
  });
};


exports.findEmpleado = function(req, res){
    Empleado.find({usuario: req.body.usuario}, function(err, emple){
        if(err){
            res.send(err);
        }
        if(emple.length >0){
            res.status(200).json(emple);
        }
    });
};

exports.todosLosEmpleados = function(res, req){
        Empleado.find({},function(err, emple){
            if(err){
                res.send(err);
            }
            if(emple.length>0){
                res.status(200).json(emple);
            }
        });
};

exports.todosLosMensajeros = function(res, req){
        Empleado.find({rol:'mensajero'},function(err, emple){
            if(err){
                res.send(err);
            }
            if(emple.length>0){
                res.status(200).json(emple);
            }
        });
};

exports.todosLosAdmins = function(res, req){
        Empleado.find({rol:'admin'},function(err, emple){
            if(err){
                res.send(err);
            }
            if(emple.length>0){
                res.status(200).json(emple);
            }
        });
};


exports.updateEmpleado = function(res, req){
    Empleado.findOneAndUpdate({usuario: req.body.usuario},function(err, emple){
        if (err) {
            res.send(err);
        }
        res.status(200).send('Empleado actualizado');
    });
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
