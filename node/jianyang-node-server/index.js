"use strict";
exports.__esModule = true;
var http = require("http");
var fs = require("fs");
var p = require("path");
var url = require("url");
module.exports.listen = function (cacheAge, port) {
    if (cacheAge === void 0) { cacheAge = 3600 * 24; }
    if (port === void 0) { port = 8080; }
    console.log(1);
    var homeDir = p.resolve(__dirname, 'public');
    var server = http.createServer();
    //@ts-ignore
    server.on('request', function (request, response) {
        var method = request.method, path = request.url;
        var pathname = url.parse(path).pathname;
        if (method !== 'GET') {
            response.setHeader('Content-Type', 'text/html;charset=utf-8');
            response.statusCode = 405;
            response.end('请求格式不正确');
        }
        var filename = pathname.substring(1);
        if (filename === '') {
            filename = 'index.html';
        }
        //response.setHeader('Content-Type', 'text/html;charset=utf-8')
        fs.readFile(p.resolve(homeDir, filename), function (error, data) {
            if (error) {
                if (error.errno === -4058) {
                    response.stateCode = 404;
                    fs.readFile(p.resolve(homeDir, '404.html'), function (error2, data) {
                        if (error2)
                            throw error2;
                        response.setHeader('Content-Type', 'text/html;charset=utf-8');
                        response.end(data);
                    });
                }
            }
            else {
                response.setHeader('Cache-Control', "public, max-age=" + cacheAge);
                response.end(data);
            }
        });
    });
    server.listen(port);
};
