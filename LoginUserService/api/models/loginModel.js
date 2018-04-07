var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({

    nombres: {
        type: String
    },
    apellidos: {
        type: String
    },
    genero: {
        type: [{
            type: String,
            enum: ['M', 'F', ''] //Masculino, Femenino
        }],
    },
    edad: {
        type: String
    },
    correo: {
        type: String,
        required: 'el correo es obligatorio.',
        unique:true,
    },
    password: {
        type: String
    },
    passA: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('User', UserSchema);
