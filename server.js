var Koa = require('koa');
var serve = require('koa-static');
var connections = require('./config/connections');

var app = Koa();
var url = connections.hostname + ':' + connections.port;

app.use(serve(__dirname + '/public'));
app.listen(connections.port);

console.log('Serving on ' + url + ' in ' + connections.env);
