'use strict';

var PORT = 1234;
var http = require('http');
var fs = require('fs');
var formidable = require('formidable');
var url = require('url');

var server = http.createServer(
    function (request, response) {
        if (request.url === '/upload' && request.method.toLowerCase() === 'post') {
            uploadFile(request, response);
        }
        else if ((request.url.indexOf('/downloads?') === 0) && (request.method.toLowerCase() === 'get')) {
            sendFile(request, response);
        }
        else {
            response.writeHead(404, {'content-type': 'text/plain'});
            response.write(http.STATUS_CODES[404]);
            response.end();
        }
    }).listen(PORT);

console.log('Server is listening on port ' + PORT);

function uploadFile(request, response) {
    var form = new formidable.IncomingForm();
    form.uploadDir = '../downloads';
    form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.on('error', function (error) {
        response.writeHead(500, {'content-type': 'text/plain'});
        response.write(error.message);
        response.end();
    });
    form.parse(request, function (err, fields, files) {
        var fileName = files['file-name'].path.substr('/downloads'.length);
        response.writeHead(200, {'content-type': 'text/html'});
        response.write('<a href="http://localhost:'+PORT+'/downloads?file=' + fileName + '" download="' +
            files['file-name'].name + '">Download the file</a>');
        response.end();
    });
}

function sendFile(request, response) {
    var query = url.parse(request.url, true);
    if (query.query.file) {
        var stream = fs.createReadStream('../downloads/' + query.query.file);
        stream.on('error', function (error) {
            response.writeHead(404, {'content-type': 'text/plain'});
            response.write(http.STATUS_CODES[404]);
            response.end();
        });
        response.writeHead(200);
        stream.pipe(response);
        stream.on('end', function(){
            response.end();
        });
    }
    else {
        response.writeHead(400, {'content-type': 'text/plain'});
        response.write(http.STATUS_CODES[400]);
        response.end();
    }
}
