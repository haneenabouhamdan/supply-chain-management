import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderItemInput } from './dto/create-order-item.input';
import { UpdateOrderItemInput } from './dto/update-order-item.input';
import { OrderItemService } from './order-items.service';

@Resolver(() => OrderItem)
export class OrderItemResolver {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Query(() => [OrderItem], { name: 'orderItems' })
  async findAll(): Promise<OrderItem[]> {
    return this.orderItemService.findAll();
  }

  @Query(() => OrderItem, { name: 'orderItem' })
  async findOne(@Args('id') id: UUID): Promise<OrderItem> {
    return this.orderItemService.findOne(id);
  }

  @Mutation(() => OrderItem)
  async createOrderItem(
    @Args('createOrderItemInput') createOrderItemInput: CreateOrderItemInput,
  ): Promise<OrderItem> {
    return this.orderItemService.create(createOrderItemInput);
  }

  @Mutation(() => OrderItem)
  async updateOrderItem(
    @Args('id') id: UUID,
    @Args('updateOrderItemInput') updateOrderItemInput: UpdateOrderItemInput,
  ): Promise<OrderItem> {
    return this.orderItemService.update(id, updateOrderItemInput);
  }

  @Mutation(() => Boolean)
  async removeOrderItem(@Args('id') id: UUID): Promise<boolean> {
    return this.orderItemService.remove(id);
  }
}
