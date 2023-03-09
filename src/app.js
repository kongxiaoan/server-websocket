const express = require('express');
const middleware = require('./services/server');
const routes = require('./api/routes');
const createWebSocketServer = require('./services/websocket');

const app = express();
const port = process.env.PORT || 8080; // 默认端口号为 8080

app.use(middleware);
app.use('/api', routes);

const wss = createWebSocketServer();

app.listen(port, () => console.log(`应用程序已启动，监听端口 ${port}`));
