import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderItemInput } from './dto/create-order-item.input';
import { UpdateOrderItemInput } from './dto/update-order-item.input';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  // Create a new order item
  async create(createOrderItemInput: CreateOrderItemInput): Promise<OrderItem> {
    const orderItem = this.orderItemRepository.create(createOrderItemInput);
    return await this.orderItemRepository.save(orderItem);
  }

  // Get all order items
  async findAll(): Promise<OrderItem[]> {
    return await this.orderItemRepository.find();
  }

  // Get a single order item by ID
  async findOne(id: UUID): Promise<OrderItem> {
    const orderItem = await this.orderItemRepository.findOne({ where: { id } });
    if (!orderItem) {
      throw new NotFoundException(`OrderItem with ID ${id} not found`);
    }
    return orderItem;
  }

  async findByOrderId(orderId: UUID): Promise<OrderItem[]> {
    const orderItems = await this.orderItemRepository.findBy({
      orderId,
    });
    if (!orderItems) {
      throw new NotFoundException(`OrderItems not found`);
    }
    return orderItems;
  }

  // Update an order item by ID
  async update(
    id: UUID,
    updateOrderItemInput: UpdateOrderItemInput,
  ): Promise<OrderItem> {
    const orderItem = await this.findOne(id);
    if (!orderItem) {
      throw new NotFoundException(`Order Item with ID ${id} not found`);
    }
    this.orderItemRepository.merge(orderItem, updateOrderItemInput);
    return await this.orderItemRepository.save(orderItem);
  }

  // Remove an order item by ID
  async remove(id: UUID): Promise<boolean> {
    const orderItem = await this.findOne(id);
    if (!orderItem) {
      throw new NotFoundException(`Order Item with ID ${id} not found`);
    }
    const result = await this.orderItemRepository.delete(id);
    return result.affected === 1;
  }
}
