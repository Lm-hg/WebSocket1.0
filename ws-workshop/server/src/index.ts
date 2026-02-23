import {WebSocketServer}  from "ws";


const wss = new WebSocketServer({ port: 8080 });
wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.on("message", (message) => {
    const messageStr = message.toString();
    console.log(`Received message: ${messageStr}`);
    ws.send(`Echo: ${messageStr}`);
  });
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

wss.on("listening", () => {
  console.log("WebSocket server is listening on port 8080");
});

console.log("Server ready"); 