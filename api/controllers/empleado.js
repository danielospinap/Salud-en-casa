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
            var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
            var stringLength = 8;
            var randomString = '';
            for (var i=0; i<stringLength; i++) {
                var rNum = Math.floor(Math.random() * chars.length);
                randomString += chars.substring(rNum,rNum+1);
            }
            req.body.password = randomString;
            var nuevoEmpleado = new Empleado(req.body);
            nuevoEmpleado.save(function (err, emple) {
                if (err) {
                    res.send(err);
                }
                //enviar Email
                var mailOptions = {
                  from: 'noreplysaludencasaunnamed@gmail.com',
                  to: req.body.correo,
                  subject: 'Contraseña nueva',
                  text: 'Su contraseña es: ' + req.body.password
                };
                transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                  }
                });

                res.status(201).send('Empleado creado.');
            });
        }else {
            res.send('El usuario ya existe');
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

exports.findTodosLosEmpleados = function(res, req){
        Empleado.find({},function(err, emple){
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
