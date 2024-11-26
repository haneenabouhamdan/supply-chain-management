import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { OrderItem } from '../order-items/entities';
import { OrderItemService } from '../order-items/order-items.service';
import { ProductService } from '../product/product.service';
import { OrderDto } from './dto';
import { Supplier, SupplierService } from '../supplier';
import { CustomerService } from '../customer/customer.service';
import { Customer } from '../customer/entities';

@Resolver(() => OrderDto)
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    private orderItemService: OrderItemService,
    private productService: ProductService,
    private supplierService: SupplierService,
    private customerService: CustomerService,
  ) {}

  // Query to fetch all orders
  @Query(() => [OrderDto], { name: 'orders' })
  async findAll(): Promise<OrderDto[]> {
    return this.orderService.findAll();
  }

  // Query to fetch a single order by ID
  @Query(() => OrderDto, { name: 'order' })
  async findOne(@Args('id') id: UUID): Promise<OrderDto> {
    return this.orderService.findOne(id);
  }

  // Mutation to create a new order
  @Mutation(() => OrderDto)
  async createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ): Promise<OrderDto> {
    return this.orderService.create(createOrderInput);
  }

  // Mutation to update an order by ID
  @Mutation(() => OrderDto)
  async updateOrder(
    @Args('id') id: UUID,
    @Args('updateOrderInput') updateOrderInput: UpdateOrderInput,
  ): Promise<OrderDto> {
    return this.orderService.update(id, updateOrderInput);
  }

  // Mutation to remove an order
  @Mutation(() => Boolean)
  async removeOrder(@Args('id') id: UUID): Promise<boolean> {
    return this.orderService.remove(id);
  }

  // ResolveField for fetching order items along with product details
  @ResolveField(() => [OrderItem], { name: 'items' })
  async getOrderItems(@Parent() order: Order): Promise<OrderItem[]> {
    // Fetch order items based on the order ID
    const orderItems = await this.orderItemService.findByOrderId(order.id);

    // Map through order items to fetch product details
    const enrichedItems = await Promise.all(
      orderItems.map(async (item) => {
        const product = await this.productService.findOne(
          item.productId as UUID,
        );
        return {
          ...item,
          product,
        };
      }),
    );
    return enrichedItems;
  }

  // ResolveField for fetching order items along with product details
  @ResolveField(() => Supplier, { name: 'supplier' })
  async getSupplier(@Parent() order: OrderDto): Promise<Supplier> {
    // Fetch order items based on the order ID
    const supplier = await this.supplierService.findOne(
      order.supplierId as UUID,
    );

    return supplier;
  }

  // ResolveField for fetching order items along with product details
  @ResolveField(() => Customer, { name: 'customer' })
  async getCustomer(@Parent() order: OrderDto): Promise<Supplier> {
    // Fetch order items based on the order ID
    const customer = await this.customerService.findOne(
      order.customerId as UUID,
    );

    return customer;
  }
}
