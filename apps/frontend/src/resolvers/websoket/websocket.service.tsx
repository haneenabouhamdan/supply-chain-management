import { io, Socket } from "socket.io-client";
import { Inventory } from "../inventory/inventory.types";

interface InventoryUpdateDto {
  productId: string;
  quantity: number;
  location: string;
  supplierId: string;
}

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

  // Listen for inventory updates
  onInventoryUpdate(callback: (inventoryUpdates: Inventory[]) => void) {
    this.socket.on("inventoryUpdate", callback);
  }

  // Request server to send the latest inventory data
  requestInventoryUpdate() {
    this.socket.emit("requestInventoryUpdate");
  }

  // Handle connection events
  onConnect(callback: () => void) {
    this.socket.on("connect", callback);
  }

  // Handle disconnection events
  onDisconnect(callback: () => void) {
    this.socket.on("disconnect", callback);
  }
}

export default new WebSocketService();
