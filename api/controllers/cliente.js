var mongoose = require('mongoose'),
    Cliente = mongoose.model('Client');
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'noreplysaludencasaunnamed@gmail.com',
        pass: 'ContraSalud'
      }
    });

exports.crearCliente = function (req, res) {
    Cliente.find({usuario: req.body.usuario}, function (err, cli) {
        if (cli.length === 0) {
            var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
            var stringLength = 8;
            var randomString = '';
            for (var i=0; i<stringLength; i++) {
                var rNum = Math.floor(Math.random() * chars.length);
                randomString += chars.substring(rNum,rNum+1);
            }
            req.body.password = randomString;
            var nuevoCliente = new Cliente(req.body);
            nuevoCliente.save(function (err, cli) {
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

                res.status(201).send('Cliente creado.');
            });
        }else {
            res.send('El correo ya esta en uso');
        }
    });
}

exports.loginCliente = function(req, res) {
  Cliente.find({usuario: req.body.usuario, password: req.body.password}, function(err, cli) {
    if (err)
      res.send(err);
    if (cli.length > 0) {
        res.status(200).send('ok')
    }
    res.status(422).send('datos erroneos');
  });
};


exports.findCliente = function(req, res){
    Cliente.find({usuario: req.body.usuario}, function(err, cli){
        if(err){
            res.send(err);
        }
        if(cli.length >0){
            res.status(200).json(cli);
        }
    });
};

exports.todosLosClientes = function(res, req){
        Cliente.find({},function(err, cli){
            if(err){
                res.send(err);
            }
            if(cli.length>0){
                res.status(200).json(cli);
            }
        });
};

exports.updateCliente = function(res, req){
    Cliente.findOneAndUpdate({usuario: req.body.usuario},function(err, cli){
        if (err) {
            res.send(err);
        }
        res.status(200).send('Cliente actualizado');
    });
};
