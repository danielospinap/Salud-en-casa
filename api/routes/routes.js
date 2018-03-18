module.exports = function(app) {
    var empleadoCtrl = require('../controllers/empleado.js');

    // todoList Routes
    app.route('/empleado').post(empleadoCtrl.crearEmpleado);
/*

    app.route('/tasks/:taskId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);
*/
};
