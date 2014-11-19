var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development:{
        rootPath: rootPath,
        db: 'mongodb://localhost:27017/shop-db',
        port: 1235
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://admin:horae@ds033170.mongolab.com:33170/shopdb',
        port: process.env.PORT
    }
};