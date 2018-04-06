'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');


exports.validate = function(req, res) {
    console.log(req.body.correo);
    User.findById(req.body.correo, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};



exports.newUser = function(req, res) {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var stringLength = 8;
    var randomString = '';
    for (var i=0; i<stringLength; i++) {
        var rNum = Math.floor(Math.random() * chars.length);
        randomString += chars.substring(rNum,rNum+1);
    }
    req.body.password = randomString;
    var newUser = new User(req.body);
    newUser.save(function (error, userJson) {
        if (error) {
            res.send(error);
        }
            res.json(userJson);
            //agregar aquí email automático
   });
};


exports.update = function(req, res) {

    User.findOneAndUpdate({"correo":req.body.correo}, req.body, function(err, userJson) {
        if (err) {
            res.send(err);
        }
            res.sendStatus(200);
    });

};

exports.find = function(req, res) {

    User.findOne({"correo":req.body.correo},function(err, userJson) {
        if (err) {
            res.send(err);
        }
            res.json(userJson);
    });

};
