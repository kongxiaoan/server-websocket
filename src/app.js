const express = require('express');
const middleware = require('./services/server');
const routes = require('./api/routes');

const app = express()

app.use(middleware)
app.use('/api', routes)

app.listen(8081, () => console.log('应用程序已启动，监听端口 8081'))
