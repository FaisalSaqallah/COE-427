const WebSocket = require('ws');
const port = 3003; // Port for Counters
const server = new WebSocket.Server({ port });

server.on('connection', (socket) => {
    console.log(`Counters WebSocket server running on ws://192.168.8.177:${port}`);
    socket.on('message', (message) => {
        try {
            console.log('Raw message received:', message.toString()); // Debug raw message
            const parsedMessage = JSON.parse(message.toString());
            console.log(`Parsed message on Counters server:`, parsedMessage);

            // Broadcast to all clients
            server.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(parsedMessage));
                }
            });
        } catch (error) {
            console.error('Failed to parse message:', error);
        }
    });
});

console.log(`Counters WebSocket server listening on ws://192.168.8.177:${port}`);
