var redis = require('sails-redis');

var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 8000;
var hostname = 'localhost';

module.exports = {
  name: 'Totoro',
  env: env,
  port: port,
  hostname: hostname,
};
