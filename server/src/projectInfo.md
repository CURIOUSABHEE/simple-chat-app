¯
# WebSocket Message Schema

This document describes the message structure used for communication between the client and the server in the chat application.

All messages follow a common structure:

```json
{
  "type": "string",
  "payload": { }
}
```

- `type`: Defines the kind of action being performed.
- `payload`: Contains the data required for that action.

---

## Messages Sent From Client → Server

### 1. Join a Room

Used when a user wants to join a specific chat room.

```json
{
  "type": "join",
  "payload": {
    "roomId": "123"
  }
}
```

- `roomId`: The unique identifier of the room the user wants to join.

---

### 2. Send a Chat Message

Used when a user sends a message to the current room.

```json
{
  "type": "chat",
  "payload": {
    "message": "hi there"
  }
}
```

- `message`: The actual text content sent by the user.

---

## Messages Sent From Server → Client

The server responds or broadcasts messages using the same base structure.

### 1. Incoming Chat Message (Broadcast)

```json
{
  "type": "chat",
  "payload": {
    "roomId": "123",
    "message": "hi there",
    "senderId": "user_1",
    "timestamp": 1700000000000
  }
}
```

- `roomId`: Room where the message was sent.
- `message`: Message content.
- `senderId`: Identifier of the user who sent the message.
- `timestamp`: Unix timestamp (in milliseconds) when the message was created.

---

## Design Principles

1. **Single Envelope Pattern**  
   Every message contains `type` and `payload` to keep the protocol consistent and extensible.

2. **Extensibility**  
   New message types (e.g., `leave`, `typing`, `error`, `system`) can be added without breaking the structure.

3. **Room-Based Communication**  
   Messages are scoped to rooms to enable multi-room chat functionality.

---