import { Module, forwardRef } from '@nestjs/common';
import { AppGateway } from './App.gateway';
import { InventoryService } from '../inventory/inventory.service';
import { InventoryRepository } from '../inventory/repository';
import { InventoryFilter } from '../inventory/filters';

@Module({
  imports: [],
  providers: [
    AppGateway,
    InventoryService,
    InventoryRepository,
    InventoryFilter,
  ],
  exports: [AppGateway],
})
export class GatewayModule {}
