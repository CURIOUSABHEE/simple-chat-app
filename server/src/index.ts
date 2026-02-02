import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

let userCount = 0;
let allSockets = new Map<WebSocket, string>;


wss.on('connection', (ws) => {
    console.log(`User connected. Total users: ${userCount}`);

    ws.on('message', (message) => {
    });

    ws.on('close', () => {
    });

    ws.on('error', console.error);
});