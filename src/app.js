const express = require('express');
const middleware = require('./services/server');
const routes = require('./api/routes');
const websocket = require('./services/websocket');

const app = express();
const port = process.env.PORT || 9001; // 默认端口号为 8080

app.use(middleware);
app.use('/api', routes);

websocket.start_websocket();

app.listen(port, () => console.log(`应用程序已启动，监听端口 ${port}`));
