const WebSocket = require('ws');

// 存储已验证的客户端
const clients = new Set();

// 发送心跳包
function heartbeat() {
  clients.forEach((client) => {
    if (!client.isAlive) return client.terminate();
    client.isAlive = false;
    client.ping(null, undefined);
  });
}

function createWebSocketServer() {
    console.log('开始启动websocket')
    const wss = new WebSocket.Server({ port: 8087 });

    wss.on('connection', function connection(ws) {
      console.log('WebSocket connected');
    
      ws.isAlive = true;
        // 处理收到的消息
      ws.on('message', (message) => {
        JSON.stringify(message)
        if (ws.isAuthorized) {
            if(message == 'pang') {
                // pang 
            } else {
                console.log(`Received message from authorized client: ${message}`);
            }
    
        } else {
        if (message == 'auth') {
            ws.isAuthorized = true;
            clients.add(ws);
            console.log('Client authorized');
            ws.send(`authorized`)
        } else {
            console.log('Client unauthorized');
            ws.terminate();
        }
        }
    });
    ws.on('error', e => {
        console.log(e)
        ws.send(e)
    })

    // 处理连接关闭
    ws.on('close', () => {
        console.log('Client disconnected');
        clients.delete(ws);
     });

    // 处理心跳检测
    ws.on('pong', () => {
        ws.isAlive = true;
    });
    });


    // 启动心跳检测
    setInterval(heartbeat, 30000);
    return wss;
}
module.exports = createWebSocketServer