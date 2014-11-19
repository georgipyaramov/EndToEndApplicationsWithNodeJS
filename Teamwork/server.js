var express = require('express');

var env = process.env.NODE_ENV || 'development';

var app = express();
var envConfig = require('./server/config/env')[env];
require('./server/config/express')(app, envConfig);
require('./server/config/mongoose')(envConfig);
require('./server/config/passport')();
require('./server/config/routes')(app);

app.listen(envConfig.port);
console.log('Server running on port: ' + envConfig.port);