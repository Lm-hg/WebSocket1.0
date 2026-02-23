import { WebSocket, WebSocketServer } from "ws";
import { ClientMessage, ServerMessage } from "../../shared/types";

type ChatSocket = WebSocket & { nickname?: string };

const wss = new WebSocketServer({ port: 8080 });

console.log("Serveur WebSocket pret sur ws://localhost:8080");

function sendToClient(ws: WebSocket, message: ServerMessage): void {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message));
  }
}

function broadcast(message: ServerMessage, exclude?: WebSocket): void {
  wss.clients.forEach((client) => {
    if (client !== exclude && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

function getOnlineUsers(): string[] {
  return Array.from(wss.clients)
    .map((client) => (client as ChatSocket).nickname)
    .filter((nickname): nickname is string => Boolean(nickname))
    .sort((a, b) => a.localeCompare(b));
}

function broadcastUserList(): void {
  broadcast({ type: "user-list", users: getOnlineUsers() });
}

function parseClientMessage(raw: string): ClientMessage | null {
  try {
    return JSON.parse(raw) as ClientMessage;
  } catch {
    return null;
  }
}

wss.on("connection", (ws, req) => {
  const socket = ws as ChatSocket;
  const clientAddress = req.socket.remoteAddress ?? "unknown";
  console.log(`Client connecte : ${clientAddress}`);

  ws.on("message", (message) => {
    const payload = parseClientMessage(message.toString());
    if (!payload || !payload.type) {
      sendToClient(ws, { type: "system", text: "Message invalide." });
      return;
    }

    switch (payload.type) {
      case "set-nick": {
        const nextNick = payload.nick.trim();
        if (!nextNick) {
          sendToClient(ws, { type: "system", text: "Pseudo vide refuse." });
          return;
        }

        const currentNick = socket.nickname;
        socket.nickname = nextNick;

        if (!currentNick) {
          broadcast({ type: "system", text: `${nextNick} a rejoint le chat` });
        } else if (currentNick !== nextNick) {
          broadcast({
            type: "system",
            text: `${currentNick} est maintenant ${nextNick}`,
          });
        }

        broadcastUserList();
        return;
      }

      case "chat": {
        if (!socket.nickname) {
          sendToClient(ws, {
            type: "system",
            text: "Definissez un pseudo avant de discuter.",
          });
          return;
        }

        const text = payload.text.trim();
        if (!text) {
          return;
        }

        broadcast({
          type: "chat",
          nick: socket.nickname,
          text,
          ts: Date.now(),
        });
        return;
      }

      case "typing": {
        if (!socket.nickname) {
          return;
        }
        broadcast({ type: "typing", nick: socket.nickname }, ws);
        return;
      }

      case "leave": {
        if (!socket.nickname) {
          return;
        }

        const oldNick = socket.nickname;
        socket.nickname = undefined;
        broadcast({ type: "system", text: `${oldNick} a quitte le chat` });
        broadcastUserList();
        return;
      }

      default: {
        sendToClient(ws, { type: "system", text: "Type non supporte." });
      }
    }
  });

  ws.on("close", () => {
    const nickname = socket.nickname;
    if (nickname) {
      broadcast({ type: "system", text: `${nickname} a quitte le chat` });
      broadcastUserList();
    }
    console.log(`Client deconnecte : ${clientAddress}`);
  });

  sendToClient(ws, { type: "system", text: "Connexion etablie." });
  sendToClient(ws, { type: "user-list", users: getOnlineUsers() });
});
