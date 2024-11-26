import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { OrderItem } from '../order-items/entities';
import { Product } from '../product/entities';
import { OrderStatus } from './enums';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createOrderInput: CreateOrderInput): Promise<Order> {
    const {
      customerId,
      reference,
      paymentType,
      paymentAmount,
      items,
      supplierId,
    } = createOrderInput;

    if (!items || items.length === 0) {
      throw new Error('Order items cannot be empty.');
    }

    // Create the order
    const order = this.orderRepository.create({
      customerId,
      reference,
      paymentType,
      paymentAmount,
      supplierId,
      status: OrderStatus.REQUESTED,
    });
    const savedOrder = await this.orderRepository.save(order);

    items.map(async (item) => {
      if (!item.productId || item.quantity <= 0) {
        throw new Error(
          `Invalid product ID or quantity for item: ${JSON.stringify(item)}`,
        );
      }
      const product = await this.productRepository.findOneBy({
        id: item.productId as UUID,
      });
      // reduce product quantity
      await this.productRepository.update(item.productId, {
        quantity: product.quantity - item.quantity,
      });

      return this.orderItemRepository.create({
        orderId: savedOrder.id,
        productId: item.productId,
        quantity: item.quantity,
      });
    });
    // Create all order items asynchronously
    const createdOrderItems = await Promise.all(
      items.map(async (item) =>
        this.orderItemRepository.create({
          orderId: savedOrder.id,
          productId: item.productId,
          quantity: item.quantity,
        }),
      ),
    );

    // Save all created order items
    await this.orderItemRepository.save(createdOrderItems);

    return savedOrder;
  }

  // Get all orders
  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  // Get a single order by ID
  async findOne(id: UUID): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  // Update an order by ID
  async update(id: UUID, updateOrderInput: UpdateOrderInput): Promise<Order> {
    const order = await this.findOne(id);
    if (!order) {
      throw new NotFoundException(`Inventory with ID ${id} not found`);
    }
    this.orderRepository.merge(order, updateOrderInput);
    return await this.orderRepository.save(order);
  }

  // Remove an order by ID
  async remove(id: UUID): Promise<boolean> {
    const order = await this.findOne(id);
    if (!order) {
      throw new NotFoundException(`Inventory with ID ${id} not found`);
    }
    const result = await this.orderRepository.delete(id);
    return result.affected === 1;
  }

  async processReturn(
    orderId: string,
    productId: string,
    returnDetails: Record<string, any>,
  ): Promise<string> {
    // Simulate processing the return
    return `Return for product ${productId} from order ${orderId} processed with details: ${JSON.stringify(returnDetails)}.`;
  }

  // Track a return
  async trackReturn(returnId: string): Promise<string> {
    // Simulate tracking logic
    return `Tracking details for return ${returnId} retrieved.`;
  }
  async getOrderSummary(filters: Record<string, any>): Promise<string> {
    // Simulate summary generation logic
    return `Order summary generated with filters: ${JSON.stringify(filters)}`;
  }
}
