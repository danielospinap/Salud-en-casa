'use strict';
module.exports = function(app) {
    var login = require('../controllers/loginController');

    app.route('/login').post(login.validate);

    app.route('/register').post(login.newUser);

    app.route('/update').put(login.update);

    app.route('/find').post(login.find);


};
