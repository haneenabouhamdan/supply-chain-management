import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryService } from './inventory.service';
import { InventoryResolver } from './inventory.resolver';
import { Inventory } from './entities/inventory.entity';
import { ProductService } from '../product/product.service';
import { Product } from '../product/entities';
import { Supplier, SupplierService } from '../supplier';
import { InventoryRepository } from './repository';
import { InventoryFilter } from './filters';
import { AppGateway } from '../gateway/App.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory, Product, Supplier])],
  providers: [
    InventoryService,
    InventoryResolver,
    ProductService,
    InventoryRepository,
    SupplierService,
    InventoryFilter,
    AppGateway,
  ],
})
export class InventoryModule {}
