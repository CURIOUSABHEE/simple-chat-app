import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

let userCount = 0;
let allSockets: WebSocket[] = [];

wss.on('connection', (ws) => {
    allSockets.push(ws);
    userCount++;

    console.log(`User connected. Total users: ${userCount}`);

    ws.on('message', (message) => {
        console.log("Message received:", message.toString());
        const text = message.toString();

        allSockets.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(text);
            }
        });
    });

    ws.on('close', () => {
        userCount--;
        allSockets = allSockets.filter(socket => socket !== ws);
        console.log(`User disconnected. Total users: ${userCount}`);
    });

    ws.on('error', console.error);
});