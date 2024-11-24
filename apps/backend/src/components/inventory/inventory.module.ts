import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryService } from './inventory.service';
import { InventoryResolver } from './inventory.resolver';
import { Inventory } from './entities/inventory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory])],
  providers: [InventoryService, InventoryResolver],
})
export class InventoryModule {}
