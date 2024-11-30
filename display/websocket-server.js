const WebSocket = require('ws');
const port = 3001; // Port for Display
const server = new WebSocket.Server({ port });

server.on('connection', (socket) => {
    console.log(`Display WebSocket server running on ws://192.168.8.141:${port}`);
    socket.on('message', (message) => {
        try {
            const parsedMessage = JSON.parse(message.toString()); // Parse the Buffer into JSON
            console.log(`Message received on Display server:`, parsedMessage);

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

console.log(`Display WebSocket server listening on ws://192.168.8.141:${port}`);

