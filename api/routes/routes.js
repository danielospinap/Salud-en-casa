module.exports = function(app) {
    var empleadoCtrl = require('../controllers/empleado.js');

    // todoList Routes
    app.route('/empleado/register').post(empleadoCtrl.crearEmpleado);

    app.route('/empleado/login').post(empleadoCtrl.loginEmpleado);

    app.route('/empleado/update').put(empleadoCtrl.updateEmpleado);

    app.route('/empleado/all').post(empleadoCtrl.findTodosLosEmpleados);

    app.route('/empleado/find').post(empleadoCtrl.findEmpleado);

/*

    app.route('/tasks/:taskId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);
*/
};
