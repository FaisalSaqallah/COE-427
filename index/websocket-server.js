const WebSocket = require('ws');
const port = 3004; // Port for Kiosk
const server = new WebSocket.Server({ port });

server.on('connection', (socket) => {
    console.log(`Kiosk WebSocket server running on ws://192.168.8.157:${port}`);
    socket.on('message', (message) => {
        try {
            const parsedMessage = JSON.parse(message.toString()); // Parse the Buffer into JSON
            console.log(`Message received on Kiosk server:`, parsedMessage);

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

console.log(`Kiosk WebSocket server listening on ws://192.168.8.157:${port}`);
