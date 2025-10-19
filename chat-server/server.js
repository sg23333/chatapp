const WebSocket = require('ws');

// 在端口 9000 上创建 WebSocket 服务器
const wss = new WebSocket.Server({ port: 9000 });

console.log('聊天服务器已启动，正在监听 9000 端口...');

// 监听连接事件
wss.on('connection', ws => {
  console.log('一位客户端已连接。');

  // 监听来自客户端的消息
  ws.on('message', message => {
    // 将收到的 Buffer 转换为字符串
    const messageString = message.toString();
    console.log('收到消息 => %s', messageString);

    // --- 核心修改在这里 ---
    // 遍历所有连接的客户端
    wss.clients.forEach(client => {
      // 判断：如果这个客户端不是消息的发送者，并且处于连接状态
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        // 就把消息发送给它
        client.send(messageString);
      }
    });
  });

  // 监听连接关闭事件
  ws.on('close', () => {
    console.log('一位客户端已断开连接。');
  });
});