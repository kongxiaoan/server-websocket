// 引入 express 框架
var express = require('express')

/**
 * 初始化框架,并将初始化后的函数给予 '当前页面'全局变量 app
 * 也就是说, app 是 express 
 */
var app = express()

//设置 public 为静态文件的存放文件夹
app.use('/public', express.static('public'))

app.get('/', function(req, res) {
    res.send('你好')
})

var server = app.listen(8080, function() {
    var host = server.address().address
    var port = server.address().port

    console.log("Node.js 服务器已经启动， 访问地址： http://%s:%s", host, port)
})