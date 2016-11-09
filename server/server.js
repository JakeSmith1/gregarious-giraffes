var express = require('express');
var bodyparser = require('body-parser');
var logger = require('morgan');
var path = require('path');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('../webpack.config');
var router = express.Router();


//initiate express
var app = express();

//Coors
app.use((req, res, next) => {
 res.header('Access-Controll-Allow-Origin', '*');
 res.header('Access-Controll-Allow-Methods', 'GET, POST, PUT, DELETE');
 res.header('Access-Controll-Expose-Headers', 'token');
 next();
});

//middleware
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(bodyparser());
app.use(logger('dev'));
app.use(express.static(__dirname + '/../client'));

//configure our server with routing file in /server/config/api-router
//require('./config/api-router.js')(app, express);
//var users = require('./config/auth');
const users = require('./config/user-routes');
const routes = require('./config/routes');
app.use('/api', users);
app.use('/api', routes);

// require routes
var imageUpload = require('./config/imageRoutes');
var form = require('./config/formRoutes');
app.use('/api', imageUpload);
app.use('/api', form);

// server serves index.html for all routes
app.get('*', function(req, res){
  res.sendFile(path.resolve(__dirname, '../client', 'index.html'))
});

//set and run the port and server
app.set('port', process.env.PORT || 8080);
var port = app.get('port');
app.listen(port);
console.log("Server listening on PORT", port);

module.exports = app;
