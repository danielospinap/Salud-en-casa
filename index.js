var express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  port = process.env.PORT || 3000,
  Pedido = require('./api/models/pedidoModel'), //created model loading here
  bodyParser = require('body-parser');


require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/pedidoRoutes'); //importing route
routes(app); //register the route


app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
