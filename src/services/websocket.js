const WebSocket = require('ws');
const protobuf = require("protobufjs");
const imFile = "../public/IMClientParams.proto";
const imEnumFile = "../public/IMClientEnum.proto";

function start_websocket() {
    (async () => {
        const imContent = await protobuf.load(imFile);
        const imEnum = await protobuf.load(imEnumFile);
        
        // 生成解析器
        const imContentParser = imContent.lookupType("com.example.mylibrary.IMClientParams");
        // const imEnumParser = imEnum.lookupType("com.example.mylibrary.IMClientCMDEnum");
        console.log("websocket 已启动")
        const wss = new WebSocket.Server({ port: 8081 });
        
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
        
        wss.on('connection', (ws) => {
          console.log('Client connected');
          ws.isAlive = true;
          // 处理收到的消息
          ws.on('message', (message) => {
            if (ws.isAuthorized) {
                if(message == 'pang') {
                    // pang
                } else {
                    const _message = imContentParser.decode(message);
                    const jsonMessage = _message.toJSON();
                    console.log(jsonMessage);
                    ws.send("我是服务端，收到了你的消息")
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
            console.log("已经断开连接")
            clients.delete(ws);
          });
        
          // 处理心跳检测
          ws.on('pong', () => {
            ws.isAlive = true;
          });
        });
        
        // 启动心跳检测
        setInterval(heartbeat, 30000);
        })(); 
};

module.exports = {
    start_websocket: start_websocket
}