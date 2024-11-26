import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { Product } from './entities/product.entity';
import { AppGateway } from '../gateway/App.gateway';
import { InventoryService } from '../inventory/inventory.service';
import { InventoryRepository } from '../inventory/repository';
import { InventoryFilter } from '../inventory/filters';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [
    ProductResolver,
    ProductService,
    AppGateway,
    InventoryService,
    InventoryRepository,
    InventoryFilter,
  ],
})
export class ProductModule {}
