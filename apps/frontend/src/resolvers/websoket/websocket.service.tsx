import { io, Socket } from "socket.io-client";
import { NotificationDto } from "../notifications";

class WebSocketService {
  socket: Socket;

  constructor() {
    this.socket = io("http://localhost:3000", {
      transports: ["websocket"],
      upgrade: false,
    });

    // Enable debugging
    this.socket.on("connect_error", (err) => {
      console.log("Connection Error: ", err.message);
    });

    this.socket.on("connect_timeout", () => {
      console.log("Connection Timeout");
    });

    this.socket.on("error", (err) => {
      console.log("Error: ", err.message);
    });

    this.socket.on("reconnect_failed", () => {
      console.log("Reconnection Failed");
    });
  }

  joinChannel(channelId: string) {
    this.socket.emit("joinChannel", { channelId });
  }

  sendNotification(notification: NotificationDto) {
    this.socket.emit("notify", notification);
  }

  onNotification(callback: (notification: NotificationDto) => void) {
    this.socket.on("notification", callback);
  }

  onConnect(callback: () => void) {
    this.socket.on("connect", callback);
  }

  onDisconnect(callback: () => void) {
    this.socket.on("disconnect", callback);
  }
}

export default new WebSocketService();
