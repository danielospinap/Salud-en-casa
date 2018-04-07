var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Empleado = require('./api/models/empleado'),
    Cliente = require('./api/models/cliente')
    bodyParser = require('body-parser');

    //TODO:Comentar cuando se suba
    //require('dotenv').config();



// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/routes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('DB: Pais server started on: ' + port);
