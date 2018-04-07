module.exports = function(app) {
    var empleadoCtrl = require('../controllers/empleado.js');
    var clienteCtrl = require('../controllers/cliente.js');

    app.route('/empleado/register').post(empleadoCtrl.crearEmpleado);
    app.route('/empleado/login').post(empleadoCtrl.loginEmpleado);
    app.route('/empleado/update').put(empleadoCtrl.updateEmpleado);
    app.route('/empleado/all').post(empleadoCtrl.todosLosEmpleados);
    app.route('/empleado/find').post(empleadoCtrl.findEmpleado);
    app.route('/empleado/allDeliverys').post(empleadoCtrl.todosLosMensajeros);
    app.route('/empleado/allAdmins').post(empleadoCtrl.todosLosAdmins);

    app.route('/client/register').post(clienteCtrl.crearCliente);
    app.route('/client/login').post(clienteCtrl.loginCliente);
    app.route('/client/update').put(clienteCtrl.updateCliente);
    app.route('/client/all').post(clienteCtrl.todosLosClientes);
    app.route('/client/find').post(clienteCtrl.findCliente);

/*

    app.route('/tasks/:taskId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);
*/
};
