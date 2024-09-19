const WebSocket = require('ws');
let wss;

const initializeWebSocket = (server) => {
  wss = new WebSocket.Server({ server });
  wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
      console.log('Received:', message);
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });
    
  });
};

// Notify all clients about low stock
const notifyLowStock = (product) => {
  // Broadcast the message to all connected WebSocket clients
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ 
        message: `Low stock alert for ${product.name}. Only ${product.quantity} left.`, 
        productName: product.name, 
        quantity: product.quantity 
      }));
    }
  });
};

module.exports = { initializeWebSocket, notifyLowStock };
