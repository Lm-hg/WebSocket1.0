import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

console.log("Serveur WebSocket pret sur ws://localhost:8080");

function broadcast(text: string): void {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(text);
    }
  });
}

wss.on("connection", (ws, req) => {
  const clientAddress = req.socket.remoteAddress ?? "unknown";
  console.log(`Client connecte : ${clientAddress}`);

  ws.on("message", (message) => {
    const text = message.toString().trim();
    if (!text) {
      return;
    }

    if (!(ws as any).nickname) {
      (ws as any).nickname = text;
      broadcast(`${(ws as any).nickname} a rejoint le chat`);
      return;
    }

    const nickname = (ws as any).nickname;
    broadcast(`${nickname}: ${text}`);
  });

  ws.on("close", () => {
    const nickname = (ws as any).nickname;
    if (nickname) {
      broadcast(`${nickname} a quitte le chat`);
    }
    console.log(`Client deconnecte : ${clientAddress}`);
  });
});
