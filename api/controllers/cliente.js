var mongoose = require('mongoose'),
    Cliente = mongoose.model('Client');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
    }
});


exports.createCliente = function (req, res) {
    //Busca si el correo ya existe
    Cliente.find({correo: req.body.correo}, function (err, cli) {
        if (err) {
            res.send(err);
        }
        if (cli.length === 0) {            
            createUsername(req.body.correo.toLowerCase(), 0, function (username) {
                var pass = createPassword();
                var nuevoCliente = new Cliente(req.body);
                nuevoCliente.usuario = username;
                nuevoCliente.clave = pass;
                nuevoCliente.save(function (err, cl) {
                    if (err) {
                        res.send(err);
                    }
                    sendMail(req.body.correo, username, pass);
                    res.status(201).send('Cliente registrado');
                });
                
                
            });

            //var password = createPassword();
        } else {
            res.status(422).send('Correo ya esta en uso.')
        }
    });
}

function createUsername(correo, i, callback) {
    var username = '';
    if (i === 0) {
        username = correo.split('@');
        username = username[0];
    } else {
        username = correo + i;
    }

    Cliente.find({usuario: username}, function (err, usr) {
        if (usr.length === 0) {                        
            callback(username);
        } else {
            if(i > 0){
                username = username.substring(0, username.length-1);
            }
            console.log(username);
            
            createUsername(username, i+1, function (user) {
                callback(user);
            });
        }
    });
}

function createPassword() {
    var pass = '';
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (var i = 0; i < 8; i++){
        pass += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return pass;

}

function sendMail(destinatario, usuario, clave) {
    var texto = 'Sus datos de acceso son:\nUsuario: ' + usuario + "\nContraseña: " + clave;
    var mailOptions = {
        from: process.env.EMAIL,
        to: destinatario,
        subject: 'Datos de acceso - Salud en casa',
        text: texto
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
        
}

/*
exports.crearCliente = function (req, res) {
    Cliente.find({usuario: req.body.usuario}, function (err, cli) {
        if (cli.length == 0) {
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
*/
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
