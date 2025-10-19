window.addEventListener('DOMContentLoaded', () => {
  const messages = document.getElementById('messages');
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');

  // --- 核心配置：连接到您的服务器 ---
  // 将 '43.140.245.126' 替换为您的服务器 IP 地址
  // 将 '9000' 替换为您在 server.js 中设置的端口
  const ws = new WebSocket('ws://43.140.245.126:9000');

  // 添加消息到聊天窗口
  function addMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);
    messageElement.textContent = message;
    messages.appendChild(messageElement);
    // 自动滚动到底部
    messages.scrollTop = messages.scrollHeight;
  }

  // 连接成功时
  ws.onopen = () => {
    addMessage('成功连接到服务器！', 'system');
  };

  // 接收到服务器消息时
  ws.onmessage = (event) => {
    addMessage(`对方: ${event.data}`, 'received');
  };

  // 连接关闭时
  ws.onclose = () => {
    addMessage('与服务器的连接已断开。', 'system');
  };

  // 连接出错时
  ws.onerror = (error) => {
    addMessage('连接错误，请检查服务器是否正在运行！', 'system');
    console.error('WebSocket Error:', error);
  };

  // 发送消息的函数
  function sendMessage() {
    const message = messageInput.value;
    if (message.trim() !== '') {
      ws.send(message);
      addMessage(`我: ${message}`, 'sent');
      messageInput.value = ''; // 清空输入框
    }
  }

  // 点击发送按钮
  sendButton.addEventListener('click', sendMessage);

  // 按下回车键发送
  messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });
});