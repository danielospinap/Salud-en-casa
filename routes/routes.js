module.exports = function(app) {
    var productoCtrl = require('../controllers/producto.js');

    app.route('/producto/create').post(productoCtrl.crearProducto);
    app.route('/producto/list').get(productoCtrl.listProducts);
    //app.route('/producto/update').get(productoCtrl.updateProduct);

/*
    app.route('/tasks/:taskId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);
*/
};
