var express = require('express')

var app = express()

const start = async() => {
    try{
        var server = app.listen(8080, function() {
            var host = server.address().address
            var port = server.address().port
            console.log("Node.js 服务器已经启动， 访问地址： http://%s:%s", host, port)
        });
    }catch(e) {
        console.error(e)
    }
}

module.exports = start