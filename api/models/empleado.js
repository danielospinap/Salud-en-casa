var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmpleadoSchema = new Schema({
    tipo_documento: {
        type: [{
            type: String,
            enum: ['CC', 'TI', 'CE'] //Cédula de ciudadanía, Tarjeta de identidad, Cédula de extranjería
        }],
        //required: 'tipo_documento es obligatorio.'
    },
    numero_documento: {
        type: String,
        //required: 'numero_documento es obligatorio.'
    },
    nombre: {
        type: String,
        required: 'nombre es obligatorio.'
    },
    edad: {
        type: String,
        required: 'edad es obligatorio.'
    },
    /*fecha_nacimiento: {
        type: Date,
        required: 'fecha_nacimiento es obligatorio.'
    },*/
    sexo: {
        type: [{
            type: String,
            enum: ['M', 'F'] //Masculino, Femenino
        }],
        //required: 'sexo es obligatorio.'
    },
    direccion: {
        type: String,
        //required: 'direccion es obligatorio.'
    },
    telefono: {
        type: String,
        //required: 'telefono es obligatorio.'
    },
    rol: {
        type:  [{
            type: String,
            enum: ['admin', 'medico', 'mensajero']
        }],
        required: 'rol es obligatorio.'
    },
    horarios: {
        type: String
    },
    usuario: {
        type: String,
        required: 'usuario es obligatorio.'
    },
    password: {
        type: String,
        required: 'password es obligatorio.'
    },
    passwordInicial: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Empleado', EmpleadoSchema);
