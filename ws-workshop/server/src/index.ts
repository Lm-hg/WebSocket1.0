import {WebSocketServer, WebSocket}  from "ws";

const wss = new WebSocketServer({ port: 8080 });

// Fonction pour broadcaster un message à tous les clients
const broadcast = (msg: string) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
};

wss.on("connection", (ws) => {
  console.log("Client connected");
  
  ws.on("message", (message) => {
    const messageStr = message.toString();
    console.log(`Received message: ${messageStr}`);
    
    // Si c'est le premier message, c'est le pseudo
    if (!(ws as any).nickname) {
      (ws as any).nickname = messageStr;
      console.log(`Client set nickname: ${messageStr}`);
      broadcast(`${messageStr} a rejoint le chat`);
    } else {
      // Sinon, c'est un message du chat
      broadcast(`${(ws as any).nickname}: ${messageStr}`);
    }
  });
  
  ws.on("close", () => {
    const nickname = (ws as any).nickname;
    if (nickname) {
      console.log(`Client disconnected: ${nickname}`);
      broadcast(`${nickname} a quitte le chat`);
    } else {
      console.log("Client disconnected");
    }
  });
});

wss.on("listening", () => {
  console.log("WebSocket server is listening on port 8080");
});

console.log("Server ready"); 