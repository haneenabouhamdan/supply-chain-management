import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  // Query to fetch all orders
  @Query(() => [Order], { name: 'orders' })
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  // Query to fetch a single order by ID
  @Query(() => Order, { name: 'order' })
  async findOne(@Args('id') id: UUID): Promise<Order> {
    return this.orderService.findOne(id);
  }

  // Mutation to create a new order
  @Mutation(() => Order)
  async createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ): Promise<Order> {
    return this.orderService.create(createOrderInput);
  }

  // Mutation to update an order by ID
  @Mutation(() => Order)
  async updateOrder(
    @Args('id') id: UUID,
    @Args('updateOrderInput') updateOrderInput: UpdateOrderInput,
  ): Promise<Order> {
    return this.orderService.update(id, updateOrderInput);
  }

  // Mutation to remove an order
  @Mutation(() => Boolean)
  async removeOrder(@Args('id') id: UUID): Promise<boolean> {
    return this.orderService.remove(id);
  }
}
