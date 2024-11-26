import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { Order } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemService } from '../order-items/order-items.service';
import { ProductService } from '../product/product.service';
import { OrderItem } from '../order-items/entities';
import { Product } from '../product/entities';
import { Supplier, SupplierService } from '../supplier';
import { Customer } from '../customer/entities';
import { CustomerService } from '../customer/customer.service';
import { InventoryService } from '../inventory/inventory.service';
import { AppGateway } from '../gateway/App.gateway';
import { InventoryFilter } from '../inventory/filters';
import { InventoryRepository } from '../inventory/repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Product, Supplier, Customer]),
  ],
  providers: [
    OrderResolver,
    OrderService,
    OrderItemService,
    ProductService,
    SupplierService,
    CustomerService,
    InventoryFilter,
    AppGateway,
    InventoryService,
    InventoryRepository,
  ],
})
export class OrderModule {}
