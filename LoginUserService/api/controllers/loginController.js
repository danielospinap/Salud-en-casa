'use strict';
var mongoose = require('mongoose'),
    User = mongoose.model('User');


exports.validate = function(req, res) {

    User.findOne({"usuario":req.body.usuario},function(err, userJson) {
        if (err) {
            res.send(err);
        }else{
            if(req.body.password === userJson.password){
                res.sendStatus(200);
            }else{
                res.sendStatus(400);
            }
        }
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
            //agregar email
            var nodemailer = require('nodemailer');
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'noreplysaludencasaunnamed@gmail.com',
                pass: 'ContraSalud'
              }
            });

            var mailOptions = {
              from: 'noreplysaludencasaunnamed@gmail.com',
              to: req.body.correo,
              subject: 'User Password',
              text: 'Your password is: ' + req.body.password
            };

            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
            //fin email
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
