const express 	 = require('express');
const bodyParser = require('body-parser');
const config     = require('./config');
const api        = require('../routes/api');
const app        = express();

// CORS
console.log("[app] CORS enabled ");
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, set-cookie, x-access-token, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  next();
});

// Body parser
console.log("[app] Body parser ");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Routes API file for interacting with MongoDB
console.log("[app] Routes APIs ");
app.use(api);

// setting port
app.set('port', process.env.PORT || 3000);

module.exports  = app;
