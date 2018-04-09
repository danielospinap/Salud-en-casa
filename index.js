var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Producto = require('./models/producto'),
    Log = require('./models/log'),
    bodyParser = require('body-parser');

    //TODO:Comentar cuando se suba
    //require('dotenv').config();



// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./routes/routes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('inventario productos server started on: ' + port);
