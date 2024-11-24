import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';
import { CreateInventoryInput } from './dto/create-inventory.input';
import { UpdateInventoryInput } from './dto/update-inventory.input';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
  ) {}

  // Create a new inventory record
  async create(createInventoryInput: CreateInventoryInput): Promise<Inventory> {
    const inventory = this.inventoryRepository.create(createInventoryInput);
    return await this.inventoryRepository.save(inventory);
  }

  // Get all inventory records
  async findAll(): Promise<Inventory[]> {
    return await this.inventoryRepository.find();
  }

  // Get a single inventory record by ID
  async findOne(id: UUID): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findOne({ where: { id } });
    if (!inventory) {
      throw new NotFoundException(`Inventory with ID ${id} not found`);
    }
    return inventory;
  }

  // Update an inventory record by ID
  async update(
    id: UUID,
    updateInventoryInput: UpdateInventoryInput,
  ): Promise<Inventory> {
    const inventory = await this.findOne(id);
    this.inventoryRepository.merge(inventory, updateInventoryInput);
    return await this.inventoryRepository.save(inventory);
  }

  // Remove an inventory record by ID
  async remove(id: UUID): Promise<boolean> {
    const inventory = await this.findOne(id);
    if (!inventory) {
      throw new NotFoundException(`Inventory with ID ${id} not found`);
    }
    const result = await this.inventoryRepository.delete(id);
    return result.affected === 1;
  }

  async adjustStock(
    productId: string,
    adjustmentQuantity: number,
  ): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findOneBy({
      productId,
    });
    if (!inventory) throw new NotFoundException('Product not found');

    if (adjustmentQuantity == 0)
      throw new BadRequestException('Quatity can not be 0');

    return this.update(inventory.id, {
      ...inventory,
      quantity: adjustmentQuantity,
    });
  }

  // // Generate inventory report
  // async getInventoryReport(filters: Record<string, any>): Promise<string> {
  //   // Use filters to generate a report
  //   return `Inventory report generated with filters: ${JSON.stringify(filters)}`;
  // }
}
