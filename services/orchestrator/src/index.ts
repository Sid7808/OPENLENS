import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { config } from './config';

const app = express();
app.use(express.json());

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'orchestrator'
  });
});

// Create HTTP server
const server = http.createServer(app);

// Integrate WebSocket Server
const wss = new WebSocketServer({ noServer: true });

// Handle upgrade request from HTTP to WS
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

wss.on('connection', (ws: WebSocket) => {
  console.log('[Orchestrator WS] Client connected');

  ws.on('message', (message) => {
    console.log(`[Orchestrator WS] Received message: ${message}`);
    // Echo back the message for basic verification
    ws.send(JSON.stringify({ type: 'echo', data: message.toString() }));
  });

  ws.on('close', () => {
    console.log('[Orchestrator WS] Client disconnected');
  });

  ws.send(JSON.stringify({ status: 'connected', service: 'orchestrator' }));
});

// Start the server
server.listen(config.port, () => {
  console.log(`[Orchestrator] Service running on port ${config.port}`);
});
