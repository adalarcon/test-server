const http  = require('http');
const app   = require('./config/express');

var server = app.listen(app.get('port'), function() {
  console.log('[app] Express server listening on port ' + server.address().port);
});

setInterval(function() {
    http.get("http://dataservicemx.herokuapp.com/api/v1/");
}, 300000);
