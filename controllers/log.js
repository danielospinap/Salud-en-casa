var mongoose = require('mongoose'),
    Log = mongoose.model('Log');

exports.generateLog = function (actor, accion, valor1, valor2) {
    if (accion === 'create') {
        var nuevoLog = new Log({
            actor: actor,
            accion: accion,
            fecha: new Date(),
            valorNuevo: valor1
        });
        nuevoLog.save(function (err, logResult) {
            if (err) {
                console.log(err);
            }
        });
    } else if (accion === 'update') {
        var nuevoLog = new Log({
            actor: actor,
            accion: accion,
            fecha: new Date(),
            valorAnterior: valor1,
            valorNuevo: valor2
        });
        nuevoLog.save(function (err, logResult) {
            if (err) {
                console.log(err);
            }
        });
    } else if (accion === 'delete') {
        var nuevoLog = new Log({
            actor: actor,
            accion: accion,
            fecha: new Date(),
            valorAnterior: valor1
        });
        nuevoLog.save(function (err, logResult) {
            if (err) {
                console.log(err);
            }
        });
    }
}
