import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { OrderItemResolver } from './order-items.resolver';
import { OrderItemService } from './order-items.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem])],
  providers: [OrderItemResolver, OrderItemService],
})
export class OrderItemsModule {}
