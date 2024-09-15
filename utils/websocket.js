const WebSocket = require('ws');
let wss;

const initializeWebSocket = (server) => {
  wss = new WebSocket.Server({ server });
  wss.on('connection', (ws) => {
    console.log('New client connected');
  });
};

// Notify all clients about low stock
const notifyLowStock = (product) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ 
        message: 'Low stock alert', 
        productName: product.name, 
        quantity: product.quantity 
      }));
    }
  });
};

module.exports = { initializeWebSocket, notifyLowStock };
