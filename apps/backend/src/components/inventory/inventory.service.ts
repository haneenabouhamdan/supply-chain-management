import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInventoryInput } from './dto/create-inventory.input';
import { UpdateInventoryInput } from './dto/update-inventory.input';
import { Inventory } from './entities/inventory.entity';
import {
  InventoryFilterArgs,
  InventoryInsightsDto,
} from './dto/inventory.input';
import { InventoryRepository } from './repository';

@Injectable()
export class InventoryService {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  // Create a new inventory record
  async create(createInventoryInput: CreateInventoryInput): Promise<Inventory> {
    const inventory = this.inventoryRepository.create(createInventoryInput);
    return await this.inventoryRepository.save(inventory);
  }

  // Get all inventory records with filters
  async findAll(filters: InventoryFilterArgs): Promise<Inventory[]> {
    return this.inventoryRepository.getList(filters);
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

  // Generate inventory report
  async getInventoryReport(filters: InventoryFilterArgs): Promise<string> {
    const inventories = await this.findAll(filters);
    // Implement report generation logic based on inventories
    return `Inventory report generated with ${inventories.length} records.`;
  }

  async getInsights(
    filters: InventoryFilterArgs,
  ): Promise<InventoryInsightsDto> {
    const inventories = await this.findAll(filters);

    const totalInventories = inventories.length;
    const totalProducts = inventories.reduce(
      (count, inv) => count + (inv.products?.length || 0),
      0,
    );
    const lowStockProducts = inventories.reduce(
      (count, inv) =>
        count +
        (inv.products?.filter(
          (product) => product.quantity < (product.threshold || 0),
        ).length || 0),
      0,
    );
    const distinctSuppliers = new Set(inventories.map((inv) => inv.supplierId))
      .size;
    const averageStockPerInventory = totalProducts / (totalInventories || 1);

    return {
      totalInventories,
      totalProducts,
      lowStockProducts,
      distinctSuppliers,
      averageStockPerInventory,
    };
  }
}
