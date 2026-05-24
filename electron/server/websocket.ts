import { WebSocketServer, WebSocket } from 'ws';
import { WEBSOCKET_PORT } from '@ghs/constant';
import type { MessageInfo } from '@ghs/types';

export type WebsocketMessageCategory =
  | 'message'
  | 'step'
  | 'notify'
  | 'log'
  | 'progress'
  | 'console';

export interface WebsocketMessagePayload {
  category: WebsocketMessageCategory;
  data: MessageInfo;
}

let server: WebSocketServer | null = null;

const safeSend = (client: WebSocket, payload: string) => {
  if (client.readyState === WebSocket.OPEN) {
    client.send(payload);
  }
};

export const sendWebsocketMessage = (category: WebsocketMessageCategory, data: MessageInfo) => {
  if (!server) {
    return;
  }

  const payload = JSON.stringify({ category, data });
  server.clients.forEach((client) => {
    safeSend(client, payload);
  });
};

export const useWebsocketServer = () => {
  if (server) {
    return server;
  }

  server = new WebSocketServer({ port: WEBSOCKET_PORT });

  server.on('listening', () => {
    console.log(`websocket server started: ws://127.0.0.1:${WEBSOCKET_PORT}`);
  });

  server.on('error', (error) => {
    console.log(`websocket server error: ${error.message}`);
  });

  return server;
};
