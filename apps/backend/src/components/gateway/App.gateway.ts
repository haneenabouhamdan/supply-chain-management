import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { InventoryService } from '../inventory/inventory.service';

@WebSocketGateway({
  cors: {
    origin: '*', // Allow all origins, adjust as needed for security
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  constructor(private readonly inventoryService: InventoryService) {}

  afterInit(server: Server) {
    this.logger.log('WebSocket Gateway Initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  /**
   * Send inventory updates to clients
   */
  @SubscribeMessage('requestInventoryUpdate')
  async handleRequestInventoryUpdate(client: Socket): Promise<void> {
    const inventoryUpdates = await this.inventoryService.findAll({});
    client.emit('inventoryUpdate', inventoryUpdates);
  }

  /**
   * Broadcast inventory updates when changes are detected
   */
  async broadcastInventoryUpdate(): Promise<void> {
    const inventoryUpdates = await this.inventoryService.findAll({});
    this.server.emit('inventoryUpdate', inventoryUpdates);
    console.log('Broadcasted inventory updates');
  }

  /**
   * Listen for inventory adjustment events from clients
   */
  //   @SubscribeMessage('adjustInventory')
  //   async handleInventoryAdjustment(
  //     client: Socket,
  //     payload: { productId: string; quantity: number; threshold: number },
  //   ): Promise<void> {
  //     try {
  //       await this.inventoryService.updateProductQuantityAndThreshold(
  //         payload.productId,
  //         payload.quantity,
  //         payload.threshold,
  //       );
  //       const updatedInventory = await this.inventoryService.findAll({});
  //       this.broadcastInventoryUpdate(updatedInventory);
  //     } catch (error) {
  //       client.emit('inventoryAdjustmentError', {
  //         message: 'Failed to adjust inventory',
  //         error: error.message,
  //       });
  //       this.logger.error('Error adjusting inventory:', error.message);
  //     }
  //   }
}
