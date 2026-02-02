import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

let allSockets = new Map<WebSocket, string>();

wss.on('connection', (socket) => {

    socket.on('message', (message) => {
        // message is now an object
        // message is string so we need to parse it into a object.

        const parsedMessage = JSON.parse(message.toString());
        if (parsedMessage.type === "join") {
            allSockets.set(socket, parsedMessage.payload.roomId);
        }
        if (parsedMessage.type === "chat") {
            const currentUserRoom = allSockets.get(socket);

            if (!currentUserRoom) return;

            for (const [socket, roomId] of allSockets.entries()) {
                if (roomId === currentUserRoom && socket.readyState === WebSocket.OPEN) {
                    socket.send(parsedMessage.payload.message);
                }
            }
        }
        console.log(allSockets);

    });

    socket.on('close', () => {
    });

    socket.on('error', console.error);
});